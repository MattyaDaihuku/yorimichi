
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUserId } from '@/lib/auth-utils';
import { ChatMessage } from '@/lib/chat-utils';

type HistoryBlock = {
    user_content: string;
    ai_content: string;
};

export async function GET(
    req: Request,
    { params }: { params: Promise<{ branchId: string }> }
) {
    try {
        const userId = await getAuthUserId(req);
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const { branchId } = await params;

        // 1. ブランチの存在確認と権限チェック
        const branch = await prisma.branches.findUnique({
            where: { branch_id: branchId },
            include: { chat: true }
        });

        if (!branch || branch.chat.user_id !== userId) {
            return new NextResponse("Branch not found", { status: 404 });
        }

        // 2. 履歴を遡って全てのブロックを収集する
        const allBlocks: HistoryBlock[] = [];
        let currentBranchId: string | null = branchId;

        while (currentBranchId) {
            const currentBranch: {
                parent_branch_id: string | null;
                blocks: HistoryBlock[];
            } | null = await prisma.branches.findUnique({
                where: { branch_id: currentBranchId },
                select: {
                    parent_branch_id: true,
                    blocks: {
                        select: {
                            user_content: true,
                            ai_content: true,
                        },
                        orderBy: { created_at: 'asc' }
                    }
                }
            });

            if (!currentBranch) break;

            // このブランチのブロックを配列の先頭に追加（遡っているので）
            allBlocks.unshift(...currentBranch.blocks);

            // 親ブランチへ移動
            currentBranchId = currentBranch.parent_branch_id;
        }

        // 3. AI SDK形式の履歴に変換
        const history: ChatMessage[] = allBlocks.map((block) => {
            const msgs: ChatMessage[] = [];
            if (block.user_content) msgs.push({ role: 'user', content: block.user_content });
            if (block.ai_content) msgs.push({ role: 'assistant', content: block.ai_content });
            return msgs;
        }).flat();

        return NextResponse.json({ history });

    } catch (error) {
        console.error("[BRANCH_HISTORY]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
