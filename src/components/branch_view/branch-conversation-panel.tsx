"use client";

import { useChatStore } from "@/store/chat-store";
import { MessageBlock } from "../chat/message-block";
import { Block, BranchNodeData } from "./types";

type BranchConversationPanelProps = {
  selectedBranch: BranchNodeData | null;
  blocks: Block[];
  containerHeight: number;
};

export function BranchConversationPanel({
  selectedBranch,
  blocks,
  containerHeight,
}: BranchConversationPanelProps) {
  const branches = useChatStore((state) => state.chatData?.branches ?? {});
  const branchedBlockIds = new Set(
    Object.values(branches)
      .filter((branch) => typeof branch.parent_block_id === "string")
      .map((branch) => branch.parent_block_id as string)
  );

  return (
    <aside
      className="w-full shrink-0 rounded-xl border bg-[#f6f6f6] dark:bg-muted/20 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ height: `${containerHeight}px` }}
    >
      {blocks.length === 0 ? (
        <div className="p-4 pt-8">
          <p className="text-sm text-muted-foreground">このヨリミチに会話はまだありません。</p>
        </div>
      ) : (
        <div className="px-2 pb-4 pt-4">
          {blocks.map((block, index) => (
            <MessageBlock
              key={block.block_id}
              block={block}
              isCompact={true}
              connector={{
                style: branchedBlockIds.has(block.block_id) ? "branched" : "straight",
                type: index === blocks.length - 1 ? "split" : "continue",
                options: {
                  showBranch: false,
                  showReturn: false
                }
              }}
            />
          ))}
        </div>
      )}
    </aside>
  );
}