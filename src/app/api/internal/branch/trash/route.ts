
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { z } from 'zod';

const requestSchema = z.object({
    trash_branch_id: z.string().uuid(),
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

        const { trash_branch_id } = validation.data;

        // Recursive delete logic
        await prisma.$transaction(async (tx) => {
            // 1. Get branch to check existence/ownership if needed
            const target = await tx.branches.findUnique({
                where: { branch_id: trash_branch_id },
                select: { chat_id: true }
            });
            if (!target) {
                return new NextResponse("Branch not found", { status: 404 });
            }

            // 2. Fetch all branches for this chat to build hierarchy
            const allBranches = await tx.branches.findMany({
                where: { chat_id: target.chat_id }
            });

            // 3. Find descendants
            const toDelete = new Set<string>();
            const queue = [trash_branch_id];

            while (queue.length > 0) {
                const current = queue.pop()!;
                toDelete.add(current);

                const children = allBranches.filter(b => b.parent_branch_id === current);
                for (const child of children) {
                    queue.push(child.branch_id);
                }
            }

            // 4. Hard Delete - Remove Blocks first, then Branches to respect FKs if any
            // (Note: Prisma schema likely has Cascade delete on Block -> Branch, but explict deletion is safer/clearer here given we collected IDs)

            const deleteIds = Array.from(toDelete);

            // Delete blocks belonging to these branches
            await tx.block.deleteMany({
                where: {
                    branch_id: { in: deleteIds }
                }
            });

            // Delete the branches themselves
            await tx.branches.deleteMany({
                where: {
                    branch_id: { in: deleteIds }
                }
            });
        });

        return new NextResponse(JSON.stringify({ status: "success" }), { status: 200 });

    } catch (error) {
        console.error("[BRANCH_Trash]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
