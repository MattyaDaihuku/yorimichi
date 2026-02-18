
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { z } from 'zod';

const requestSchema = z.object({
    branch_id: z.string().uuid(),
    copied_block_id: z.string().uuid(),
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

        const { branch_id, copied_block_id } = validation.data;

        // マージロジックの実装
        // 要件: 親のブランチIDでブランチに所属する会話すべてを複製、元のブランチにあるものはstatusをmerged,
        // マージされなかったかつ、親ブランチのIDを行のparent_branch_idにもつもののSTATUSをdroppedにする

        // 1. 対象のブランチを取得
        const branch = await prisma.branches.findUnique({
            where: { branch_id },
        });

        if (!branch || !branch.parent_branch_id) {
            return new NextResponse("Branch or parent branch not found", { status: 404 });
        }

        const parentBranchId = branch.parent_branch_id;
        const parentBlockId = branch.parent_block_id;

        await prisma.$transaction(async (tx) => {
            // Logic from verification_v3.py:
            // 1. Drop Siblings (same parent_branch_id, same parent_block_id)
            if (parentBlockId) {
                await tx.branches.updateMany({
                    where: {
                        parent_branch_id: parentBranchId,
                        parent_block_id: parentBlockId,
                        branch_id: { not: branch_id },
                        status: 'active'
                    },
                    data: { status: 'dropped' }
                });
            } else {
                await tx.branches.updateMany({
                    where: {
                        parent_branch_id: parentBranchId,
                        branch_id: { not: branch_id },
                        status: 'active'
                    },
                    data: { status: 'dropped' }
                });
            }

            // 2. Copy Blocks to Parent Branch (Restored)
            const blocks = await tx.block.findMany({
                where: { branch_id: branch_id },
                orderBy: { created_at: 'asc' }
            });

            for (const block of blocks) {
                await tx.block.create({
                    data: {
                        branch_id: parentBranchId,
                        user_content: block.user_content,
                        ai_content: block.ai_content,
                    }
                });
            }

            // 3. Update Source Branch Status -> Merged
            // merged_into_id unused
            await tx.branches.update({
                where: { branch_id: branch_id },
                data: { status: "merged" }
            });

            // 4. Unlock Parent Branch
            await tx.branches.updateMany({
                where: {
                    branch_id: parentBranchId,
                    status: 'locked'
                },
                data: { status: 'active' }
            });
        });

        return new NextResponse(JSON.stringify({ status: "success" }), { status: 200 });

    } catch (error) {
        console.error("[BRANCH_Merge]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
