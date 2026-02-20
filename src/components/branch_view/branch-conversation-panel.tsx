"use client";

import { Block, BranchNodeData } from "./types";

type BranchConversationPanelProps = {
  selectedBranch: BranchNodeData | null;
  blocks: Block[];
};

export function BranchConversationPanel({ selectedBranch, blocks }: BranchConversationPanelProps) {
  return (
    <aside className="w-[250px] h-[800px] shrink-0 rounded-xl border bg-white p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="mb-3 pb-3 border-b">
        <p className="text-xs text-muted-foreground">選択中のブランチ</p>
        <p className="text-sm font-semibold truncate">{selectedBranch?.branch_title ?? "未選択"}</p>
      </div>

      {blocks.length === 0 ? (
        <p className="text-sm text-muted-foreground">このブランチの会話はまだありません。</p>
      ) : (
        <div className="space-y-3">
          {blocks.map((block) => (
            // ブロックコンポーネントに置き換える
            <div key={block.block_id} className="space-y-2">
              <div className="rounded-lg bg-slate-100 px-3 py-2">
                <p className="text-[11px] text-muted-foreground mb-1">You</p>
                <p className="text-sm whitespace-pre-wrap">{block.user_content}</p>
              </div>
              <div className="rounded-lg bg-blue-50 px-3 py-2">
                <p className="text-[11px] text-muted-foreground mb-1">AI</p>
                <p className="text-sm whitespace-pre-wrap">{block.ai_content || "..."}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}