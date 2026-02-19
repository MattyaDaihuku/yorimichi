"use client";

import { useState } from "react";
import type { ChatDetailResponse } from "@/store/chat-store";
import { MainBranchBlockList } from "@/components/chat/main-branch-block-list";
import { MainBranchChatInput } from "@/components/chat/main-branch-chat-input";

type BranchItem = ChatDetailResponse["branches"][string];
type BlockItem = ChatDetailResponse["blocks"][string];

type MainBranchViewProps = {
  chatId: string;
  branch: BranchItem;
  blocks: BlockItem[];
  branchedBlockIds: Set<string>;
  reload: () => Promise<void>;
};

type StreamingBlock = {
  block_id: string;
  user_content: string;
  ai_content: string;
  created_at: string;
};

export function MainBranchView({ chatId, branch, blocks, branchedBlockIds, reload }: MainBranchViewProps) {
  const [streamingBlock, setStreamingBlock] = useState<StreamingBlock | null>(null);

  const handleSend = async (message: string) => {
    const history = blocks.flatMap((block) => [
      { role: "user" as const, content: block.user_content },
      { role: "assistant" as const, content: block.ai_content },
    ]);

    setStreamingBlock({
      block_id: "streaming-block",
      user_content: message,
      ai_content: "",
      created_at: new Date().toISOString(),
    });

    const res = await fetch("/api/internal/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        branch_id: branch.branch_id,
        block_id: crypto.randomUUID(),
        message,
        history,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    if (!res.body) {
      throw new Error("Response stream is not available");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let aiContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      aiContent += decoder.decode(value, { stream: true });
      setStreamingBlock((prev) =>
        prev
          ? {
              ...prev,
              ai_content: aiContent,
            }
          : prev
      );
    }

    await reload();
    setStreamingBlock(null);
  };

  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-muted/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Main Branch View
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {branch.branch_title} / status: {branch.status}
        </p>
      </div>

      <MainBranchBlockList
        blocks={blocks}
        streamingBlock={streamingBlock}
        branchedBlockIds={branchedBlockIds}
      />
      <MainBranchChatInput onSend={handleSend} />
    </section>
  );
}
