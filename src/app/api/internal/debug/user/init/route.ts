
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
    try {
        if (process.env.NODE_ENV === 'production') {
            return new NextResponse("Not allowed in production", { status: 403 });
        }

        const testUser = {
            user_id: "user_2t1aaaaaaaaaaaaaaaaaaaaaa", // Clerk-like string ID
            name: "Test User",
            email: "test@example.com",
        };

        const user = await prisma.users.upsert({
            where: { user_id: testUser.user_id },
            update: {
                name: testUser.name,
                email: testUser.email,
            },
            create: {
                user_id: testUser.user_id,
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
