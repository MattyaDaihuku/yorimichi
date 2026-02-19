import { MessageBlock } from "@/components/chat/message-block";
import type { ChatDetailResponse } from "@/store/chat-store";

type BlockItem = ChatDetailResponse["blocks"][string];
type StreamingBlock = {
  block_id: string;
  user_content: string;
  ai_content: string;
  created_at: string;
};

type MainBranchBlockListProps = {
  blocks: BlockItem[];
  streamingBlock?: StreamingBlock | null;
  branchedBlockIds?: Set<string>;
  onBranch?: (blockId: string) => void;
};

export function MainBranchBlockList({
  blocks,
  streamingBlock,
  branchedBlockIds = new Set<string>(),
  onBranch,
}: MainBranchBlockListProps) {
  if (blocks.length === 0 && !streamingBlock) {
    return (
      <div className="rounded-lg border bg-muted/20 p-6 text-sm text-muted-foreground">
        まだ会話がありません。下の入力欄からメッセージを送信してください。
      </div>
    );
  }

  const displayBlocks = [...blocks, ...(streamingBlock ? [streamingBlock] : [])];

  return (
    <div>
      {displayBlocks.map((block, index) => {
        const isLastBlock = index === displayBlocks.length - 1;
        const connector = {
          style: branchedBlockIds.has(block.block_id) ? "branched" : "straight",
          type: isLastBlock ? "split" : "continue",
          options: isLastBlock
            ? {
                showReturn: true,
                showBranch: true,
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
