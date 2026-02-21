
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';

export async function GET(req: Request) {
    try {
        const userId = await getAuthUserId(req);

        // Security Check: Only allow in non-production or specific users
        if (process.env.NODE_ENV === 'production') {
            return new NextResponse("Not allowed in production", { status: 403 });
        }

        const [users, chatlists, branches, blocks] = await prisma.$transaction([
            prisma.users.findMany(),
            prisma.chatlist.findMany(),
            prisma.branches.findMany(),
            prisma.block.findMany()
        ]);

        return NextResponse.json({
            users,
            chatlists,
            branches,
            blocks
        }, { status: 200 });

    } catch (error) {
        console.error("[DEBUG_DUMP]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
