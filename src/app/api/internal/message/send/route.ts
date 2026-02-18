
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { processChatInteraction, ChatMessage } from '@/lib/chat-utils';
import { z } from 'zod';

const requestSchema = z.object({
    branch_id: z.string().uuid(),
    chat_id: z.string().uuid(),
    block_id: z.string().uuid(),
    message: z.string().min(1),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })).optional(),
});

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error), { status: 400 });
        }

        const { branch_id, block_id, message, history } = validation.data;

        // 1. Transactionでブロックを作成 (AI応答前)
        await prisma.$transaction(async (tx) => {
            // ブロック作成 (AI応答保存用に空文字列で一旦作成)
            await tx.block.create({
                data: {
                    block_id: block_id,
                    branch_id: branch_id,
                    user_content: message,
                    ai_content: ""
                }
            });
        });

        // 2. Call Gemini and Stream Response
        const messages: ChatMessage[] = [
            ...(history || []),
            { role: 'user', content: message }
        ];

        return await processChatInteraction(branch_id, messages, block_id);

    } catch (error) {
        console.error("[MESSAGE_Send]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
