
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { z } from 'zod';

const requestSchema = z.object({
    chat_id: z.string().uuid(),
    parent_branch_id: z.string().uuid(),
    parent_block_id: z.string().uuid(),
    branch_id: z.string().uuid(),
    depth: z.number().int(),
    title: z.string().optional(),
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

        const { branch_id, chat_id, parent_branch_id, parent_block_id, depth, title } = validation.data;

        await prisma.$transaction(async (tx) => {
            // TIP-only branching and LOCK parent.
            if (parent_branch_id) {
                const latestBlock = await tx.block.findFirst({
                    where: { branch_id: parent_branch_id },
                    orderBy: { created_at: 'desc' }
                });

                if (latestBlock && parent_block_id !== latestBlock.block_id) {
                    throw new Error(`Usage Violation: Cannot branch from old block. Latest is ${latestBlock.block_id}`);
                }

                // Lock the parent branch
                await tx.branches.updateMany({
                    where: { branch_id: parent_branch_id, status: 'active' },
                    data: { status: 'locked', update_at: new Date() }
                });
            }

            // Create Branch (Idempotent to prevent duplicates)
            await tx.branches.upsert({
                where: { branch_id: branch_id },
                update: {}, // No-op if already exists
                create: {
                    branch_id: branch_id,
                    chat_id: chat_id,
                    parent_branch_id: parent_branch_id,
                    parent_block_id: parent_block_id,
                    branch_title: title || "新しいヨリミチ",
                    status: "active",
                    depth: depth,
                }
            });
        });

        return NextResponse.json({ success: true, branch_id });

    } catch (error: any) {
        console.error("[BRANCH_Initialize]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
