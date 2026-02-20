import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUserId } from "@/lib/auth-utils";
import { z } from "zod";

const requestSchema = z.object({
    chat_id: z.string().uuid(),
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

        const { chat_id } = validation.data;

        const chat = await prisma.chatlist.findFirst({
            where: {
                chat_id,
                user_id: userId,
            },
            select: { chat_id: true },
        });

        if (!chat) {
            return NextResponse.json({ status: "ok" }, { status: 200 });
        }

        await prisma.$transaction(async (tx) => {
            const branches = await tx.branches.findMany({
                where: { chat_id },
                select: { branch_id: true },
            });

            const branchIds = branches.map((branch) => branch.branch_id);

            if (branchIds.length > 0) {
                await tx.block.deleteMany({
                    where: {
                        branch_id: { in: branchIds },
                    },
                });

                await tx.branches.deleteMany({
                    where: {
                        branch_id: { in: branchIds },
                    },
                });
            }

            await tx.chatlist.deleteMany({
                where: {
                    chat_id,
                    user_id: userId,
                },
            });
        });

        return NextResponse.json({ status: "ok" }, { status: 200 });
    } catch (error) {
        console.error("[CHAT_REVERT]", error);
        return NextResponse.json(
            { error: "会話の取り消しに失敗しました。" },
            { status: 500 }
        );
    }
}
