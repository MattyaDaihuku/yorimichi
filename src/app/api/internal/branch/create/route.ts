
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { processChatInteraction, ChatMessage, RateLimitError } from '@/lib/chat-utils';
import { z } from 'zod';

const requestSchema = z.object({
    branch_id: z.string().uuid(),
    chat_id: z.string().uuid(),
    parent_branch_id: z.string().uuid(),
    parent_block_id: z.string().uuid(),
    block_id: z.string().uuid(), // フロントエンドで生成
    depth: z.number().int(),
    message: z.string().min(1),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })).optional(),
});

export async function POST(req: Request) {
    let branchId: string | undefined;
    let parentBranchId: string | undefined;
    let blockId: string | undefined;
    let messagesToRetry: ChatMessage[] | undefined;

    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error), { status: 400 });
        }

        const { branch_id, chat_id, parent_branch_id, parent_block_id, block_id, depth, message, history } = validation.data;
        branchId = branch_id;
        parentBranchId = parent_branch_id;
        blockId = block_id;

        const messages: ChatMessage[] = [
            ...(history || []),
            { role: 'user', content: message }
        ];
        messagesToRetry = messages;

        // 1. Transactionでブランチを作成 (AI応答前)
        await prisma.$transaction(async (tx) => {
            // Logic from verification_v3.py: Enforce TIP-only branching and LOCK parent.
            if (parent_branch_id) {
                // Get latest block of parent branch
                const latestBlock = await tx.block.findFirst({
                    where: { branch_id: parent_branch_id },
                    orderBy: { created_at: 'desc' }
                });

                if (latestBlock) {
                    if (parent_block_id && parent_block_id !== latestBlock.block_id) {
                        throw new Error(`Usage Violation: Cannot branch from old block ${parent_block_id}. Latest is ${latestBlock.block_id}`);
                    }
                }

                // Lock the parent branch
                await tx.branches.updateMany({
                    where: {
                        branch_id: parent_branch_id,
                        status: 'active'
                    },
                    data: {
                        status: 'locked',
                        update_at: new Date()
                    }
                });
            }

            // ブランチ作成
            // Use upsert to check existence first for idempotency and prevent P2002
            await tx.branches.upsert({
                where: { branch_id: branch_id },
                update: {}, // No-op if exists
                create: {
                    branch_id: branch_id,
                    chat_id: chat_id,
                    parent_branch_id: parent_branch_id,
                    parent_block_id: parent_block_id,
                    branch_title: message.substring(0, 50),
                    status: "active",
                    depth: depth,
                }
            });

            // ブロック作成 (AI応答保存用に空文字列で一旦作成)
            await tx.block.upsert({
                where: { block_id: block_id },
                update: {}, // No-op if exists
                create: {
                    block_id: block_id,
                    branch_id: branch_id,
                    user_content: message,
                    ai_content: ""
                }
            });
        });

        // 2. Call Gemini and Stream Response
        return await processChatInteraction(branch_id, messages, block_id);

    } catch (error: any) {
        console.error("[BRANCH_Create]", error);

        // Cleanup on RateLimit or other errors
        if (error instanceof RateLimitError || error?.name === 'RateLimitError' || error?.isRateLimitError) {
            if (branchId) {
                try {
                    console.log(`[BRANCH_Create] Cleaning up branch ${branchId} due to error`);
                    await prisma.block.deleteMany({ where: { branch_id: branchId } });
                    await prisma.branches.delete({ where: { branch_id: branchId } });

                    if (parentBranchId) {
                        await prisma.branches.update({
                            where: { branch_id: parentBranchId },
                            data: { status: 'active' } // Revert to active
                        });
                    }
                } catch (cleanupError) {
                    console.error("[BRANCH_Create] Cleanup failed:", cleanupError);
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
        if (error.code === 'P2002') {
            console.warn("[BRANCH_Create] P2002 Conflict ignored, proceeding conceptually as idempotent retry.", error.meta);

            try {
                if (branchId && messagesToRetry && blockId) {
                    return await processChatInteraction(branchId, messagesToRetry, blockId);
                }
            } catch (retryError: any) {
                if (retryError instanceof RateLimitError || retryError?.isRateLimitError) {
                    return NextResponse.json(
                        {
                            error: "Rate limit exceeded",
                            code: retryError.limitType === 'DAILY' ? 'RATE_LIMIT_DAILY' : 'RATE_LIMIT_MINUTE',
                            retryable: true
                        },
                        { status: 429 }
                    );
                }
                console.error("[BRANCH_Create] Retry failed:", retryError);
                return new NextResponse("Internal Error during Retry", { status: 500 });
            }
        }

        return new NextResponse("Internal Error", { status: 500 });
    }
}
