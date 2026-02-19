
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';

export async function GET(req: Request) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const chats = await prisma.chatlist.findMany({
            where: { user_id: userId },
            orderBy: [
                { is_pinned: 'desc' },
                { update_at: 'desc' }
            ],
            include: {
                branches: {
                    where: { parent_branch_id: null }, // Fetch root branches (Main)
                    take: 1
                }
            }
        });

        const response = chats.map(chat => ({
            chat_id: chat.chat_id,
            chat_title: chat.chat_title,
            is_pinned: chat.is_pinned,
            created_at: chat.created_at,
            main_branch_id: chat.branches[0]?.branch_id || null // Get ID of the root branch
        }));

        return NextResponse.json(response);
    } catch (error) {
        console.error("[CHAT_LIST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
