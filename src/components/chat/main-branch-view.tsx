"use client";

import { useState } from "react";
import type { ChatDetailResponse } from "@/store/chat-store";
import { ChatWindow } from "@/components/chat/chat-window";
import { useChatStore } from "@/store/chat-store";
import { sendMessageWithStreaming, type StreamingBlock } from "@/lib/chat-send";

type BranchItem = ChatDetailResponse["branches"][string];

type MainBranchViewProps = {
    chatId: string;
    branch: BranchItem;
    reload: () => Promise<void>;
};

export function MainBranchView({ chatId, branch, reload }: MainBranchViewProps) {
    const [streamingBlock, setStreamingBlock] = useState<StreamingBlock | null>(null);
    const chatData = useChatStore((state) => state.chatData);

    const currentBranchBlocks = Object.values(chatData?.blocks ?? {})
        .filter((block) => block.branch_id === branch.branch_id)
        .sort(
            (first, second) =>
                new Date(first.created_at).getTime() - new Date(second.created_at).getTime()
        );

    const handleSend = async (message: string) => {
        const history = currentBranchBlocks.flatMap((block) => [
            { role: "user" as const, content: block.user_content },
            { role: "assistant" as const, content: block.ai_content },
        ]);

        await sendMessageWithStreaming({
            chatId,
            branchId: branch.branch_id,
            message,
            history,
            reload,
            setStreamingBlock,
        });
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

            <ChatWindow
                branchId={branch.branch_id}
                streamingBlock={streamingBlock}
                onSend={handleSend}
                fixedInput
                fixedOffsetClassName="left-0 right-0 md:left-[72px]"
                disclaimerText="AI は間違えることがあります。重要な情報は確認してください。"
            />
        </section>
    );
}
