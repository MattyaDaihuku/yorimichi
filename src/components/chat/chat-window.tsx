"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatComposer } from "@/components/chat/chat-composer";
import { BlockList } from "@/components/chat/block-list";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";

type StreamingBlock = {
    block_id: string;
    user_content: string;
    ai_content: string;
    created_at: string;
};

type ChatWindowProps = {
    branchId: string;
    streamingBlock?: StreamingBlock | null;
    onBranch?: (blockId: string) => void;
    onSend: (message: string) => Promise<void>;
    inputPlaceholder?: string;
    inputAlwaysBorder?: boolean;
    disabled?: boolean;
    disclaimerText?: string;
    fixedInput?: boolean;
    fixedOffsetClassName?: string;
    className?: string;
};

export function ChatWindow({
    branchId,
    streamingBlock,
    onBranch,
    onSend,
    inputPlaceholder = "メインブランチで会話する...",
    inputAlwaysBorder = true,
    disabled = false,
    disclaimerText,
    fixedInput = false,
    fixedOffsetClassName = "left-0 right-0 md:left-[72px]",
    className,
}: ChatWindowProps) {
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const blockListRef = useRef<HTMLDivElement | null>(null);
    const blocks = useChatStore((state) => state.chatData?.blocks ?? {});

    const branchBlockCount = useMemo(
        () => Object.values(blocks).filter((block) => block.branch_id === branchId).length,
        [blocks, branchId]
    );

    useEffect(() => {
        const container = blockListRef.current;
        if (!container) return;

        const blockElements = container.querySelectorAll<HTMLElement>("[data-message-block='true']");
        const latestBlock = blockElements[blockElements.length - 1];
        latestBlock?.scrollIntoView({ behavior: "auto", block: "start" });
    }, [branchId, branchBlockCount, streamingBlock?.ai_content]);

    const send = async () => {
        const message = input.trim();
        if (!message || isSending || disabled) return;

        setIsSending(true);
        setInput("");
        try {
            await onSend(message);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className={cn("space-y-4", fixedInput ? "pb-64" : "", className)}>
            <div ref={blockListRef}>
                <BlockList
                    branchId={branchId}
                    streamingBlock={streamingBlock}
                    onBranch={onBranch}
                />
            </div>

            {fixedInput ? (
                <div className={cn("pointer-events-none fixed bottom-0 z-20 bg-background pb-[env(safe-area-inset-bottom)]", fixedOffsetClassName)}>
                    <div className="absolute -top-7 left-0 right-0 z-0 h-8 bg-gradient-to-b from-transparent to-background" />
                    <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-0 pb-6">
                        <div className="pointer-events-auto mx-auto w-full max-w-3xl">
                            <ChatComposer
                                value={input}
                                onChange={setInput}
                                onSubmit={send}
                                placeholder={inputPlaceholder}
                                disabled={disabled}
                                isSending={isSending}
                                alwaysBorder={inputAlwaysBorder}
                            />
                        </div>
                        {disclaimerText && (
                            <p className="mt-3 text-center text-xs text-muted-foreground">{disclaimerText}</p>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="mx-auto w-full max-w-3xl">
                        <ChatComposer
                            value={input}
                            onChange={setInput}
                            onSubmit={send}
                            placeholder={inputPlaceholder}
                            disabled={disabled}
                            isSending={isSending}
                            alwaysBorder={inputAlwaysBorder}
                        />
                    </div>

                    {disclaimerText && (
                        <p className="text-center text-xs text-muted-foreground">{disclaimerText}</p>
                    )}
                </>
            )}
        </section>
    );
}
