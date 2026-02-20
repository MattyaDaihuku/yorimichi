"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatComposer } from "@/components/chat/chat-composer";
import { BlockList } from "@/components/chat/block-list";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    const [isStreamingAutoFollow, setIsStreamingAutoFollow] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const blockListRef = useRef<HTMLDivElement | null>(null);
    const latestBottomRef = useRef<HTMLDivElement | null>(null);
    const initialFocusedBranchRef = useRef<string | null>(null);
    const focusOnNextSentBlockRef = useRef(false);
    const streamingSessionBlockIdRef = useRef<string | null>(null);
    const isAutoFollowUnlockedRef = useRef(false);
    const blocks = useChatStore((state) => state.chatData?.blocks ?? {});

    const branchBlockCount = useMemo(
        () => Object.values(blocks).filter((block) => block.branch_id === branchId).length,
        [blocks, branchId]
    );

    useEffect(() => {
        if (initialFocusedBranchRef.current === branchId) return;

        const container = blockListRef.current;
        if (!container) return;

        if (branchBlockCount === 0) return;

        const blockElements = container.querySelectorAll<HTMLElement>("[data-message-block='true']");
        const latestBlock = blockElements[blockElements.length - 1];
        if (!latestBlock) return;

        latestBlock.scrollIntoView({ behavior: "auto", block: "start" });
        initialFocusedBranchRef.current = branchId;
    }, [branchId, branchBlockCount]);

    useEffect(() => {
        if (!streamingBlock) {
            streamingSessionBlockIdRef.current = null;
            isAutoFollowUnlockedRef.current = false;
            setIsStreamingAutoFollow(false);
            return;
        }

        if (streamingSessionBlockIdRef.current !== streamingBlock.block_id) {
            streamingSessionBlockIdRef.current = streamingBlock.block_id;
            isAutoFollowUnlockedRef.current = false;
            setIsStreamingAutoFollow(false);
            return;
        }

        if (!isAutoFollowUnlockedRef.current && streamingBlock.ai_content.trim().length > 0) {
            setIsStreamingAutoFollow(true);
        }
    }, [streamingBlock?.block_id, streamingBlock?.ai_content, streamingBlock]);

    useEffect(() => {
        if (!focusOnNextSentBlockRef.current) return;

        const container = blockListRef.current;
        if (!container) return;

        const blockElements = container.querySelectorAll<HTMLElement>("[data-message-block='true']");
        const latestBlock = blockElements[blockElements.length - 1];
        if (!latestBlock) return;

        latestBlock.scrollIntoView({ behavior: "auto", block: "start" });
        focusOnNextSentBlockRef.current = false;
    }, [branchBlockCount, streamingBlock?.block_id]);

    useEffect(() => {
        if (!streamingBlock || !isStreamingAutoFollow) return;

        latestBottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }, [streamingBlock?.block_id, streamingBlock?.ai_content, isStreamingAutoFollow]);

    useEffect(() => {
        if (!streamingBlock || !isStreamingAutoFollow) return;

        const stopAutoFollow = () => {
            isAutoFollowUnlockedRef.current = true;
            setIsStreamingAutoFollow(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const unlockKeys = new Set([
                "ArrowUp",
                "ArrowDown",
                "PageUp",
                "PageDown",
                "Home",
                "End",
                " ",
            ]);
            if (unlockKeys.has(event.key)) {
                stopAutoFollow();
            }
        };

        window.addEventListener("wheel", stopAutoFollow, { passive: true });
        window.addEventListener("touchmove", stopAutoFollow, { passive: true });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", stopAutoFollow);
            window.removeEventListener("touchmove", stopAutoFollow);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [streamingBlock, isStreamingAutoFollow]);

    const send = async () => {
        const message = input.trim();
        if (!message || isSending || disabled) return;

        focusOnNextSentBlockRef.current = true;
        setIsSending(true);
        setInput("");
        try {
            await onSend(message);
        } catch (error) {
            console.error(error);
            const fallbackMessage = "送信中にエラーが発生しました。";

            let parsedCode: number | null = null;
            let parsedMessage = fallbackMessage;

            if (error instanceof Error && error.message) {
                const match = error.message.match(/^\[(\d+)\]\s*(.*)$/);
                if (match) {
                    parsedCode = Number(match[1]);
                    parsedMessage = match[2] || fallbackMessage;
                } else {
                    parsedMessage = error.message;
                }
            }

            setInput(message);
            setErrorCode(parsedCode);
            setErrorMessage(parsedMessage);
            setErrorOpen(true);
        } finally {
            setIsSending(false);
        }
    };

    const retryMessage = "しばらく時間をおいて再度お試しください。";
    const shouldShowRetryMessage = !errorMessage.includes(retryMessage);

    return (
        <>
            <AlertDialog open={errorOpen} onOpenChange={setErrorOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            エラーが発生しました{errorCode ? ` (${errorCode})` : ""}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {errorMessage}
                            {shouldShowRetryMessage && (
                                <>
                                    <br />
                                    {retryMessage}
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>閉じる</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <section className={cn("space-y-4", fixedInput ? "pb-64" : "", className)}>
                <div ref={blockListRef}>
                    <BlockList
                        branchId={branchId}
                        streamingBlock={streamingBlock}
                        onBranch={onBranch}
                    />
                    <div
                        ref={latestBottomRef}
                        aria-hidden="true"
                        className={fixedInput ? "scroll-mb-80" : "scroll-mb-6"}
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
        </>
    );
}
