
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
    try {
        if (process.env.NODE_ENV === 'production') {
            return new NextResponse("Not allowed in production", { status: 403 });
        }

        const testUser = {
            user_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            clerk_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            name: "User",
            email: "user@example.com",
            // timestamps are handled by default/updatedAt
        };

        const user = await prisma.users.upsert({
            where: { user_id: testUser.user_id },
            update: {
                name: testUser.name,
                email: testUser.email,
            },
            create: {
                user_id: testUser.user_id,
                clerk_id: testUser.clerk_id,
                name: testUser.name,
                email: testUser.email,
            }
        });

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("[DEBUG_USER_INIT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
