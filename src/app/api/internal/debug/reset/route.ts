
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';

export async function POST(req: Request) {
    try {
        const userId = await getAuthUserId(req);

        // Security Check: Only allow in non-production or specific users if needed
        if (process.env.NODE_ENV === 'production') {
            return new NextResponse("Not allowed in production", { status: 403 });
        }

        // 外部キー制約があるため、削除順序が重要です。
        // Block -> Branches -> Chatlist -> Users
        await prisma.$transaction([
            prisma.block.deleteMany(),
            prisma.branches.deleteMany(),
            prisma.chatlist.deleteMany(),
            prisma.users.deleteMany(),
        ]);

        return new NextResponse("Database reset successful", { status: 200 });

    } catch (error) {
        console.error("[DEBUG_RESET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
