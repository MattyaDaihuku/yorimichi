import { MessageBlock } from "@/components/chat/message-block";
import { useChatStore } from "@/store/chat-store";

type StreamingBlock = {
    block_id: string;
    user_content: string;
    ai_content: string;
    created_at: string;
};

type MainBranchBlockListProps = {
    branchId: string;
    streamingBlock?: StreamingBlock | null;
    onBranch?: (blockId: string) => void;
};

export function MainBranchBlockList({
    branchId,
    streamingBlock,
    onBranch,
}: MainBranchBlockListProps) {
    const chatData = useChatStore((state) => state.chatData);

    const targetBranch = chatData?.branches?.[branchId];
    const branchDepth = targetBranch?.depth ?? 0;

    const ownBlocks = Object.values(chatData?.blocks ?? {})
        .filter((block) => block.branch_id === branchId)
        .sort(
            (first, second) =>
                new Date(first.created_at).getTime() - new Date(second.created_at).getTime()
        );

    const parentBlock =
        targetBranch?.parent_block_id && targetBranch.depth > 0
            ? (chatData?.blocks?.[targetBranch.parent_block_id] ?? null)
            : null;

    const sourceBlocks = parentBlock
        ? [parentBlock, ...ownBlocks.filter((block) => block.block_id !== parentBlock.block_id)]
        : ownBlocks;

    const branchedBlockIds = new Set(
        Object.values(chatData?.branches ?? {})
            .filter((branch) => typeof branch.parent_block_id === "string")
            .map((branch) => branch.parent_block_id as string)
    );

    if (sourceBlocks.length === 0 && !streamingBlock) {
        return (
            <div className="rounded-lg border bg-muted/20 p-6 text-sm text-muted-foreground">
                まだ会話がありません。下の入力欄からメッセージを送信してください。
            </div>
        );
    }

    const displayBlocks = [...sourceBlocks, ...(streamingBlock ? [streamingBlock] : [])];

    return (
        <div>
            {displayBlocks.map((block, index) => {
                const isLastBlock = index === displayBlocks.length - 1;
                const connector = {
                    style: branchedBlockIds.has(block.block_id) ? "branched" : "straight",
                    type: isLastBlock ? "split" : "continue",
                    options: isLastBlock
                        ? {
                            showReturn: branchDepth > 0,
                            showBranch: branchDepth < 3,
                        }
                        : undefined,
                } as const;

                return (
                    <MessageBlock
                        key={block.block_id}
                        block={block}
                        connector={connector}
                        onBranch={onBranch}
                        isStreaming={streamingBlock?.block_id === block.block_id}
                    />
                );
            })}
        </div>
    );
}
