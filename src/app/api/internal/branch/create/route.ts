
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { processChatInteraction, ChatMessage } from '@/lib/chat-utils';
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
    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const validation = requestSchema.safeParse(body);
        if (!validation.success) {
            return new NextResponse(JSON.stringify(validation.error), { status: 400 });
        }

        const { branch_id, chat_id, parent_branch_id, parent_block_id, block_id, depth, message, history } = validation.data;

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
                    // If parent_block_id was null/undefined, technically we could auto-set it, but our Zod schema expects it as UUID.
                    // The input validation ensures parent_block_id is provided.
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
            await tx.branches.create({
                data: {
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
        console.error("[BRANCH_Create]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
