"use client";

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
  return (
    <aside
      className="w-full shrink-0 rounded-xl border bg-white overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="sticky top-0 z-20 bg-white p-4 pb-3 border-b mb-4">
        <p className="text-xs text-muted-foreground">選択中のブランチ</p>
        <p className="text-sm font-semibold truncate">{selectedBranch?.branch_title ?? "未選択"}</p>
      </div>

      {blocks.length === 0 ? (
        <div className="p-4">
          <p className="text-sm text-muted-foreground">このブランチの会話はまだありません。</p>
        </div>
      ) : (
        <div className="px-2 pb-4">
          {blocks.map((block, index) => (
            <MessageBlock
              key={block.block_id}
              block={block}
              isCompact={true}
              connector={{
                style: "straight",
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