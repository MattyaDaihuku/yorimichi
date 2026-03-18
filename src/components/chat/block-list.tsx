import { MessageBlock } from "@/components/chat/message-block";
import { useChatStore } from "@/store/chat-store";

type StreamingBlock = {
    block_id: string;
    user_content: string;
    ai_content: string;
    created_at: string;
};

type BlockListProps = {
    branchId: string;
    streamingBlock?: StreamingBlock | null;
    onBranch?: (blockId: string) => void;
    onMerge?: (blockId: string) => void;
    onEdit?: (params: { blockId: string; message: string }) => Promise<void>;
};

export function BlockList({
    branchId,
    streamingBlock,
    onBranch,
    onMerge,
    onEdit,
}: BlockListProps) {
    const chatData = useChatStore((state) => state.chatData);

    const targetBranch = chatData?.branches?.[branchId];
    const branchDepth = targetBranch?.depth ?? 0;

    const ownBlocks = Object.values(chatData?.blocks ?? {})
        .filter((block) => block.branch_id === branchId)
        .sort(
            (first, second) =>
                new Date(first.created_at).getTime() - new Date(second.created_at).getTime()
        );

    const allBlocks = chatData?.blocks ?? {};
    const parentBlock =
        targetBranch?.parent_block_id && targetBranch.depth > 0
            ? (allBlocks[targetBranch.parent_block_id] ?? null)
            : null;

    const sourceBlocks = parentBlock
        ? [parentBlock, ...ownBlocks.filter((block) => block.block_id !== parentBlock.block_id)]
        : ownBlocks;

    const branchedBlockIds = new Set(
        Object.values(chatData?.branches ?? {})
            .filter((branch) => branch.status === "active" || branch.status === "locked")
            .filter((branch) => typeof branch.parent_block_id === "string")
            .map((branch) => branch.parent_block_id as string)
    );

    const displayBlocks = [...sourceBlocks, ...(streamingBlock ? [streamingBlock] : [])];

    return (
        // <div className="space-y-4">
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
                        onMerge={onMerge}
                        onEdit={onEdit}
                        isStreaming={streamingBlock?.block_id === block.block_id}
                        isLast={isLastBlock}
                    />
                );
            })}
        </div>
    );
}
