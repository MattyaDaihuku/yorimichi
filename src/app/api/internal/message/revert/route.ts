import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUserId } from "@/lib/auth-utils";
import { z } from "zod";

const requestSchema = z.object({
    block_id: z.string().uuid(),
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

        const { block_id } = validation.data;

        await prisma.block.deleteMany({
            where: { block_id },
        });

        return NextResponse.json({ status: "ok" }, { status: 200 });
    } catch (error) {
        console.error("[MESSAGE_Revert]", error);
        return NextResponse.json(
            { error: "ブロックの削除に失敗しました。" },
            { status: 500 }
        );
    }
}
