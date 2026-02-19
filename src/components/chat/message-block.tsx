"use client";

import { useState } from "react";
import { Bot, Copy, MessageCircleQuestionMark, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

export type ConnectorConfig = {
    style: "straight" | "branched";
    type: "continue" | "split";
    options?: {
        showReturn?: boolean;
        showBranch?: boolean;
    };
};

type BlockViewModel = {
    block_id: string;
    user_content: string;
    ai_content: string;
    created_at: string;
};

interface MessageBlockProps {
    block: BlockViewModel;
    connector: ConnectorConfig;
    onBranch?: (blockId: string) => void;
    isStreaming?: boolean;
}

export function MessageBlock({ block, connector, onBranch, isStreaming = false }: MessageBlockProps) {
    const [copiedTarget, setCopiedTarget] = useState<"user" | "ai" | null>(null);
    const { style, type, options } = connector;
    const isSplit = type === "split";
    const isBranched = style === "branched";

    const INTER_HEIGHT = 80;
    const INTER_DOT_Y = 45;
    const LAST_HEIGHT = 140;
    const SPLIT_START_Y = 20;
    const MAIN_NODE_Y = 110;

    const BTN_CY = 60;
    const LEFT_BTN_CX = 40;
    const RIGHT_BTN_CX = 160;

    const LINE_COLOR = "text-gray-300";
    const LINE_WIDTH = "2";

    const hasAiContent = block.ai_content.trim().length > 0;
    const showThinking = isStreaming && !hasAiContent;
    const aiContent = showThinking ? "Thinking..." : block.ai_content;

    const copyToClipboard = async (text: string, target: "user" | "ai") => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedTarget(target);
            toast.success("クリップボードにコピーしました");
            setTimeout(() => {
                setCopiedTarget((current) => (current === target ? null : current));
            }, 500);
        } catch (error) {
            console.error("Failed to copy text:", error);
            toast.error("コピーに失敗しました");
        }
    };

    const BranchNode = ({ cy }: { cy: number }) => {
        const spikes = 10;
        const outerRadius = 12;
        const innerRadius = 7;

        let points = "";
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i - Math.PI / 2;
            const x = 100 + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            points += `${x},${y} `;
        }

        return (
            <g>
                <circle cx="100" cy={cy} r={outerRadius} fill="white" />
                <polygon points={points} fill="currentColor" className={LINE_COLOR} />
                <circle cx="100" cy={cy} r={5} fill="white" />
            </g>
        );
    };

    return (
        <div data-message-block="true" className="flex w-full flex-col items-center scroll-mt-24">
            <div className="relative z-10 w-full max-w-3xl rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="group mb-6 flex items-start justify-end gap-4">
                    <div className="flex flex-col gap-3 pt-3 opacity-100 transition-opacity">
                        <button
                            type="button"
                            aria-label="Copy user message"
                            className={`rounded-full transition-colors ${
                                copiedTarget === "user"
                                    ? "bg-primary/15 text-primary"
                                    : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            onClick={() => void copyToClipboard(block.user_content, "user")}
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="w-fit max-w-[75%] min-w-[120px] rounded-2xl rounded-tr-sm bg-[#E6F0FF] px-6 py-4 text-foreground/90">
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed md:text-base">
                            {block.user_content}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="shrink-0 pt-1">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
                            {isStreaming && (
                                <span className="pointer-events-none absolute -inset-1.5">
                                    <svg className="bot-circular-loader h-full w-full" viewBox="25 25 50 50">
                                        <circle
                                            className="bot-loader-path"
                                            cx="50"
                                            cy="50"
                                            r="20"
                                            fill="none"
                                            strokeWidth="2"
                                            strokeMiterlimit="10"
                                        />
                                    </svg>
                                </span>
                            )}
                            <Bot className="h-5 w-5 text-foreground" />
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col">
                        <div className="mb-2 w-full rounded-2xl rounded-tl-sm bg-white px-1 py-2 text-foreground/90">
                            <div className="prose prose-sm max-w-none text-foreground md:prose-base">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        pre({ children }) {
                                            return <>{children}</>;
                                        },
                                        code({ className, children, node, ...props }) {
                                            const match = /language-(\w+)/.exec(className || "");
                                            const codeText = String(children).replace(/\n$/, "");
                                            const isInline = node?.position?.start.line === node?.position?.end.line;

                                            if (isInline) {
                                                return (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            }

                                            return (
                                                <SyntaxHighlighter
                                                    language={match?.[1] ?? "text"}
                                                    style={oneDark}
                                                    customStyle={{
                                                        margin: 0,
                                                        borderRadius: "0.5rem",
                                                        padding: "1rem",
                                                        fontSize: "0.95rem",
                                                        lineHeight: "1.6",
                                                    }}
                                                >
                                                    {codeText}
                                                </SyntaxHighlighter>
                                            );
                                        },
                                    }}
                                >
                                    {aiContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                        {!isStreaming && (
                            <div className="flex justify-start">
                                <button
                                    type="button"
                                    aria-label="Copy AI message"
                                    className={`rounded-full p-2 transition-colors ${
                                        copiedTarget === "ai"
                                            ? "bg-primary/15 text-primary"
                                            : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                    onClick={() => void copyToClipboard(block.ai_content, "ai")}
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3 flex justify-end">
                    <p className="text-xs text-muted-foreground">{new Date(block.created_at).toLocaleString()}</p>
                </div>
            </div>

            {!isStreaming && (
                <div
                    className="relative -mt-2 z-0 w-[200px]"
                    style={{ height: isSplit ? LAST_HEIGHT : INTER_HEIGHT }}
                >
                    <svg className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible">
                    <line
                        x1="100"
                        y1="0"
                        x2="100"
                        y2={isSplit ? MAIN_NODE_Y : INTER_HEIGHT}
                        stroke="currentColor"
                        strokeWidth={LINE_WIDTH}
                        className={LINE_COLOR}
                    />

                    {!isSplit &&
                        (isBranched ? (
                            <BranchNode cy={INTER_DOT_Y} />
                        ) : (
                            <circle cx="100" cy={INTER_DOT_Y} r="4" fill="currentColor" className={LINE_COLOR} />
                        ))}

                    {isSplit && (
                        <>
                            {isBranched && <BranchNode cy={SPLIT_START_Y + 25} />}

                            <circle cx="100" cy={MAIN_NODE_Y} r="5" fill="currentColor" className="text-black" />

                            {options?.showReturn && (
                                <path
                                    d={`M 100 ${SPLIT_START_Y} C 100 ${BTN_CY} 80 ${BTN_CY} ${LEFT_BTN_CX + 20} ${BTN_CY}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={LINE_WIDTH}
                                    className={LINE_COLOR}
                                />
                            )}

                            {options?.showBranch && (
                                <path
                                    d={`M 100 ${SPLIT_START_Y} C 100 35 ${RIGHT_BTN_CX} 25 ${RIGHT_BTN_CX} ${BTN_CY - 20}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={LINE_WIDTH}
                                    className={LINE_COLOR}
                                />
                            )}
                        </>
                    )}
                    </svg>

                    {isSplit && (
                        <>
                            {options?.showReturn && (
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: LEFT_BTN_CX, top: BTN_CY }}
                                >
                                    <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-[#F9FAFB] shadow-sm transition-all hover:border-gray-300 hover:bg-white">
                                        <Check className="h-4 w-4 text-foreground/60" />
                                    </button>
                                </div>
                            )}

                            {options?.showBranch && (
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: RIGHT_BTN_CX, top: BTN_CY }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => onBranch?.(block.block_id)}
                                        className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all hover:border-foreground hover:bg-foreground hover:text-white"
                                    >
                                        <MessageCircleQuestionMark
                                            className="h-5 w-5 text-foreground group-hover:text-white"
                                        />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
