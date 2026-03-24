
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { processChatInteraction, ChatMessage, RateLimitError } from '@/lib/chat-utils';
import { z } from 'zod';
import { AVAILABLE_MODELS, ACTIVE_MODEL, FREE_DAILY_LIMIT } from '@/lib/ai-active-model';
import { decryptApiKey } from '@/lib/encryption';

const requestSchema = z.object({
    branch_id: z.string().uuid(),
    chat_id: z.string().uuid(),
    block_id: z.string().uuid(),
    message: z.string().min(1),
    model: z.enum(AVAILABLE_MODELS),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })).optional(),
});

export async function POST(req: Request) {
    let blockIdForCleanup: string | undefined;


    try {
        const userId = await getAuthUserId(req);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid request", details: validation.error.flatten() },
                { status: 400 }
            );
        }

        const { branch_id, block_id, message, model, history } = validation.data;
        blockIdForCleanup = block_id;

        // 1. Transactionでブロックを作成 (AI応答前)
        // User might be retrying, so we use upsert to avoid duplicate key error if retry uses same ID
        await prisma.$transaction(async (tx) => {
            // ブロック作成 (AI応答保存用に空文字列で一旦作成)
            // Use upsert instead of create to handle retries gracefully
            await tx.block.upsert({
                where: { block_id: block_id },
                update: {
                    user_content: message, // Update content just in case
                },
                create: {
                    block_id: block_id,
                    branch_id: branch_id,
                    user_content: message,
                    ai_content: ""
                }
            });
        });
        blockIdForCleanup = block_id;

        // Get keys from DB and decrypt them
        const dbKeys = await prisma.userApiKey.findMany({
            where: { user_id: userId }
        });
        const apiKeysObj: { google?: string; openai?: string; anthropic?: string; } = {};
        for (const k of dbKeys) {
            try {
                const plaintext = decryptApiKey(k.encrypted_key, k.iv, k.auth_tag);
                if (k.provider === 'google') apiKeysObj.google = plaintext;
                if (k.provider === 'openai') apiKeysObj.openai = plaintext;
                if (k.provider === 'anthropic') apiKeysObj.anthropic = plaintext;
            } catch (err) {
                console.error(`Failed to decrypt key for provider ${k.provider}`, err);
            }
        }

        // --- 救済措置のロジック（カウントダウン方式） ---
        if (model === ACTIVE_MODEL && !apiKeysObj.google) {
            const user = await prisma.users.findUnique({
                where: { user_id: userId },
                select: { free_usage_count: true, last_free_usage_date: true }
            });

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let remainingCount = user.free_usage_count;

            // 日付が変わっていたら残り回数をリセット
            if (!user.last_free_usage_date || user.last_free_usage_date < today) {
                remainingCount = FREE_DAILY_LIMIT;
            }

            if (remainingCount <= 0) {
                return NextResponse.json(
                    {
                        error: `本日の無料利用枠（${FREE_DAILY_LIMIT}回）を使い切りました。引き続きご利用いただくには、設定画面からご自身のAPIキーを登録してください。`,
                        code: "RATE_LIMIT_DAILY",
                        retryable: false
                    },
                    { status: 429 }
                );
            }

            // 残り回数を1つ減らす
            await prisma.users.update({
                where: { user_id: userId },
                data: {
                    free_usage_count: remainingCount - 1,
                    last_free_usage_date: now
                }
            });

            // システムのAPIキーを使用
            apiKeysObj.google = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
            
            if (!apiKeysObj.google) {
                return NextResponse.json(
                    { error: "System API Key not configured" },
                    { status: 500 }
                );
            }
        }

        // 2. Call Gemini and Stream Response
        const messages: ChatMessage[] = [
            ...(history || []),
            { role: 'user', content: message }
        ];

        return await processChatInteraction(branch_id, messages, block_id, model, apiKeysObj);

    } catch (error: any) {
        if (error instanceof RateLimitError || error?.isRateLimitError) {
            console.warn("[MESSAGE_Send] Rate Limit:", error.message);

            // Cleanup: Delete the block if it has empty ai_content (meaning it failed before streaming started)
            // This prevents "empty" blocks from cluttering the chat on retry failures
            if (blockIdForCleanup) {
                try {
                    const block = await prisma.block.findUnique({
                        where: { block_id: blockIdForCleanup },
                        select: { ai_content: true }
                    });
                    if (block && block.ai_content === "") {
                        console.log(`[MESSAGE_Send] Cleaning up empty block ${blockIdForCleanup} due to Rate Limit`);
                        await prisma.block.delete({ where: { block_id: blockIdForCleanup } });
                    }
                } catch (cleanupError) {
                    console.error("[MESSAGE_Send] Cleanup failed:", cleanupError);
                }
            }

            return NextResponse.json(
                {
                    error: "Rate limit exceeded",
                    code: error.limitType === 'DAILY' ? 'RATE_LIMIT_DAILY' : 'RATE_LIMIT_MINUTE',
                    retryable: true
                },
                { status: 429 }
            );
        }

        // Check for Prisma Unique Constraint (UUID Conflict) just in case
        if (error.code === 'P2002' || (error.message && error.message.includes('Unique constraint'))) {
            return NextResponse.json(
                { code: 'UUID_CONFLICT', error: 'Block ID collision' },
                { status: 409 }
            );
        }

        console.error("[MESSAGE_Send]", error);

        if (blockIdForCleanup) {
            try {
                await prisma.block.deleteMany({
                    where: { block_id: blockIdForCleanup },
                });
            } catch (deleteError) {
                console.error("[MESSAGE_Send][CleanupFailed]", deleteError);
            }
        }

        return NextResponse.json(
            {
                error: "メッセージ送信中にエラーが発生しました。しばらく時間をおいて再度お試しください。",
            },
            { status: 500 }
        );
    }
}
