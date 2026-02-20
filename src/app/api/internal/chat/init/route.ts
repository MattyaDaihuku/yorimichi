
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { processChatInteraction, ChatMessage } from '@/lib/chat-utils';
import { z } from 'zod';

const requestSchema = z.object({
    chat_id: z.string().uuid(),
    branch_id: z.string().uuid(),
    block_id: z.string().uuid(),
    message: z.string().min(1),
});

async function cleanupInitializedChat(chatId: string) {
    const branchIds = await prisma.branches.findMany({
        where: { chat_id: chatId },
        select: { branch_id: true },
    });

    const ids = branchIds.map((item) => item.branch_id);

    if (ids.length > 0) {
        await prisma.block.deleteMany({
            where: {
                branch_id: { in: ids },
            },
        });

        await prisma.branches.deleteMany({
            where: {
                branch_id: { in: ids },
            },
        });
    }

    await prisma.chatlist.deleteMany({
        where: { chat_id: chatId },
    });
}

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error), { status: 400 });
        }

        const { chat_id, branch_id, block_id, message } = validation.data;
        const title = message.substring(0, 50); // タイトルは長すぎないように

        // Transaction for Chatlist, Initial Branch, and Initial Block
        await prisma.$transaction(async (tx) => {
            // User upsert logic (for development/first time)


            // 1. Create Chatlist
            await tx.chatlist.create({
                data: {
                    chat_id: chat_id, // Front-end provided ID
                    user_id: userId!,
                    chat_title: title,
                    is_pinned: false
                }
            });

            // 2. Create Initial Branch
            await tx.branches.create({
                data: {
                    branch_id: branch_id, // Front-end provided ID
                    chat_id: chat_id,
                    branch_title: title,
                    status: "active",
                    depth: 0,
                    parent_branch_id: null,
                    parent_block_id: null,
                }
            });

            // 3. Create Initial Block
            await tx.block.create({
                data: {
                    block_id: block_id, // Front-end provided ID
                    branch_id: branch_id,
                    user_content: message,
                    ai_content: "", // Placeholder
                }
            });
        });

        // 4. Call Gemini and Stream Response
        const messages: ChatMessage[] = [{ role: 'user', content: message }];

        const aiResponse = await processChatInteraction(branch_id, messages, block_id);

        if (!aiResponse.ok) {
            await cleanupInitializedChat(chat_id);
        }

        return aiResponse;

    } catch (error) {
        console.error("[CHAT_INIT]", JSON.stringify(error, null, 2));
        return new NextResponse("Internal Error", { status: 500 });
    }
}
