
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { z } from 'zod';

const requestSchema = z.object({
    chat_id: z.string().uuid(),
    branch_id: z.string().uuid(),
    message: z.string().min(1),
});

export async function POST(req: Request) {
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

        const { chat_id, branch_id, message } = validation.data;
        const title = message.substring(0, 50);

        // Transaction for Chatlist and Initial Branch
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
        });

        return NextResponse.json(
            {
                chat_id,
                branch_id,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[CHAT_INIT]", error);
        return NextResponse.json(
            { error: "会話の初期化に失敗しました。" },
            { status: 500 }
        );
    }
}
