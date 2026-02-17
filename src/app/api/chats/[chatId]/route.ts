import { NextResponse } from "next/server";
import { chatLists, branches, blocks } from "@/lib/mock-db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ chatId: string }> }
) {
    const { chatId } = await params;

    // チャット情報の検索
    const chat = chatLists.find((c) => c.chat_id === chatId);

    if (!chat) {
        return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // 関連データの結合
    const relatedBranches = branches.filter((b) => b.chat_id === chatId);
    const branchIds = relatedBranches.map((b) => b.branch_id);
    const relatedBlocks = blocks.filter((blk) => branchIds.includes(blk.branch_id));

    return NextResponse.json({
        ...chat,
        branches: relatedBranches,
        blocks: relatedBlocks,
    });
}