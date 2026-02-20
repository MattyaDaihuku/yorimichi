
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { processChatInteraction, ChatMessage, RateLimitError } from '@/lib/chat-utils';
import { z } from 'zod';

const requestSchema = z.object({
    chat_id: z.string().uuid(),
    branch_id: z.string().uuid(),
    block_id: z.string().uuid(),
    message: z.string().min(1),
});

export async function POST(req: Request) {
    let chatId: string | undefined;
    let branchId: string | undefined;
    let blockId: string | undefined;
    let messageContent: string | undefined;

    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error), { status: 400 });
        }

        const { chat_id, branch_id, block_id, message } = validation.data;
        chatId = chat_id;
        branchId = branch_id;
        blockId = block_id;
        messageContent = message;
        const title = message.substring(0, 50);

        // Transaction for Chatlist, Initial Branch, and Initial Block
        await prisma.$transaction(async (tx) => {
            // 1. Create Chatlist (Upsert to prevent P2002)
            await tx.chatlist.upsert({
                where: { chat_id: chat_id },
                update: {}, // No-op if exists
                create: {
                    chat_id: chat_id,
                    user_id: userId!,
                    chat_title: title,
                    is_pinned: false
                }
            });

            // 2. Create Initial Branch
            await tx.branches.upsert({
                where: { branch_id: branch_id },
                update: {},
                create: {
                    branch_id: branch_id,
                    chat_id: chat_id,
                    branch_title: title,
                    status: "active",
                    depth: 0,
                    parent_branch_id: null,
                    parent_block_id: null,
                }
            });

            // 3. Create Initial Block
            await tx.block.upsert({
                where: { block_id: block_id },
                update: {},
                create: {
                    block_id: block_id,
                    branch_id: branch_id,
                    user_content: message,
                    ai_content: ""
                }
            });
        });

        // 4. Call Gemini and Stream Response
        const messages: ChatMessage[] = [{ role: 'user', content: message }];
        return await processChatInteraction(branch_id, messages, block_id);

    } catch (error: any) {
        console.error("[CHAT_INIT]", JSON.stringify(error, null, 2));

        // Cleanup on RateLimit
        if (error instanceof RateLimitError || error?.name === 'RateLimitError' || error?.isRateLimitError) {
            if (chatId) {
                try {
                    console.log(`[CHAT_INIT] Cleaning up chat ${chatId} due to error`);
                    await prisma.chatlist.delete({ where: { chat_id: chatId } });
                } catch (cleanupError) {
                    console.error("[CHAT_INIT] Cleanup failed:", cleanupError);
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
            console.warn("[CHAT_INIT] P2002 Conflict ignored, proceeding conceptually as idempotent retry.", error.meta);

            try {
                // Retry Gemini Interaction
                if (branchId && messageContent && blockId) {
                    const messages: ChatMessage[] = [{ role: 'user', content: messageContent }];
                    return await processChatInteraction(branchId, messages, blockId);
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
                console.error("[CHAT_INIT] Retry failed:", retryError);
                return new NextResponse("Internal Error during Retry", { status: 500 });
            }
        }

        return new NextResponse("Internal Error", { status: 500 });
    }
}
