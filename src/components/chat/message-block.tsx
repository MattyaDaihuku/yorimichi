"use client";

import { lazy, memo, Suspense, useCallback, useState } from "react";
import { Bot, Copy, MessageCircleQuestionMark, Check, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CodeHighlighter = lazy(() => import("./code-highlighter"));

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

interface AiMarkdownContentProps {
    aiContent: string;
    showThinking: boolean;
    copiedTarget: string | null;
    onCopy: (text: string, target: string) => Promise<void>;
}

interface CopyButtonProps {
    isCopied: boolean;
    onCopy: () => void;
    className?: string;
    iconClassName?: string;
    ariaLabel?: string;
    size?: any;
}

const CopyButton = memo(function CopyButton({
    isCopied,
    onCopy,
    className = "",
    iconClassName = "h-4 w-4",
    ariaLabel = "Copy text",
    size = "icon",
}: CopyButtonProps) {
    return (
        <Button
            variant="ghost"
            size={size}
            type="button"
            aria-label={ariaLabel}
            className={`flex items-center justify-center rounded-full p-0 transition-colors ${isCopied
                ? "bg-transparent hover:bg-transparent" // チェック時はホバーで暗くならない
                : "text-muted-foreground hover:bg-muted hover:text-foreground" // コピーアイコン時はホバーで暗くなる
                } ${className}`}
            onClick={onCopy}
        >
            {isCopied ? (
                <Check className={`${iconClassName} text-green-500`} />
            ) : (
                <Copy className={iconClassName} />
            )}
        </Button>
    );
});

const AiMarkdownContent = memo(function AiMarkdownContent({
    aiContent,
    showThinking,
    copiedTarget,
    onCopy,
}: AiMarkdownContentProps) {
    return (
        <div className="mb-2 w-full min-w-0 rounded-2xl rounded-tl-sm bg-white px-1 py-2 text-foreground/90">
            <div className={`prose prose-sm max-w-none break-words md:prose-base 
                            prose-code:before:content-none prose-code:after:content-none 
                            ${showThinking ? "text-muted-foreground" : "text-foreground"}`}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        pre({ children }) {
                            return <>{children}</>;
                        },
                        code({ className, children, node, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            const codeText = String(children).replace(/\n$/, "");
                            const isInline = !match;

                            const language = (match?.[1] ?? "text").toLowerCase();
                            const targetId = `code-${language}-${node?.position?.start?.offset ?? codeText.length}`;

                            if (isInline) {
                                return (
                                    <code
                                        className="mx-1 rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-medium"
                                        {...props}
                                    >
                                        {codeText}
                                    </code>
                                );
                            }

                            return (
                                <div className="my-4 flex w-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-[#282C34]">
                                    <div className="flex items-center justify-between border-b border-gray-700 bg-[#21252B] px-4 py-2">
                                        <span className="font-mono text-xs lowercase text-gray-300">
                                            {language}
                                        </span>
                                        <CopyButton
                                            isCopied={copiedTarget === targetId}
                                            onCopy={() => void onCopy(codeText, targetId)}
                                            size="icon"
                                            ariaLabel="Copy code"
                                            className="h-9 w-9"
                                            iconClassName="h-3.5 w-3.5"
                                        />
                                    </div>

                                    <div className="w-full overflow-x-auto text-sm">
                                        <Suspense
                                            fallback={
                                                <pre className="m-0 overflow-x-auto rounded-lg p-4 font-mono text-[0.95rem] leading-[1.6] text-gray-200">
                                                    <code>{codeText}</code>
                                                </pre>
                                            }
                                        >
                                            <CodeHighlighter language={language} codeText={codeText} />
                                        </Suspense>
                                    </div>
                                </div>
                            );
                        },
                    }}
                >
                    {aiContent}
                </ReactMarkdown>
            </div>
        </div>
    );
});

export function MessageBlock({ block, connector, onBranch, isStreaming = false }: MessageBlockProps) {
    const [copiedTarget, setCopiedTarget] = useState<string | null>(null);
    const [hoveredConnectorAction, setHoveredConnectorAction] = useState<"return" | "branch" | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isLongMessage = block.user_content.split("\n").length > 2;
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

    const copyToClipboard = useCallback(async (text: string, target: string) => {
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
    }, []);

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
                    <div className="flex translate-x-2 flex-col gap-3 opacity-100 transition-opacity">
                        <CopyButton
                            isCopied={copiedTarget === "user"}
                            onCopy={() => void copyToClipboard(block.user_content, "user")}
                            size="icon-lg"
                            ariaLabel="Copy user message"
                            className="h-10 w-10"
                        />
                    </div>

                    <div className={`w-fit max-w-[75%] rounded-4xl rounded-tr-sm bg-[#E6F0FF] pl-6 ${isLongMessage ? "pr-3" : "pr-6"} py-4 text-foreground/90 transition-all duration-200`}>
                        <div className="flex items-start gap-2">
                            <p className={`whitespace-pre-wrap break-words text-sm leading-relaxed md:text-base ${!isExpanded && isLongMessage ? "line-clamp-2" : ""
                                }`}>
                                {block.user_content}
                            </p>
                            {isLongMessage && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="-mt-1 h-10 w-10 shrink-0 rounded-full text-slate-500 hover:text-slate-900 toggle-ripple"
                                    data-expanded={isExpanded}
                                    aria-label={isExpanded ? "折りたたむ" : "もっと見る"}
                                >
                                    {isExpanded ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex w-full min-w-0 flex-col items-stretch gap-3 md:flex-row md:items-start md:gap-4">
                    <div className="shrink-0 self-start pt-0 md:pt-1">
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

                    <div className="flex w-full min-w-0 flex-1 flex-col">
                        <AiMarkdownContent
                            aiContent={aiContent}
                            showThinking={showThinking}
                            copiedTarget={copiedTarget}
                            onCopy={copyToClipboard}
                        />
                        {!isStreaming && (
                            <div className="flex justify-start">
                                <CopyButton
                                    isCopied={copiedTarget === "ai"}
                                    onCopy={() => void copyToClipboard(block.ai_content, "ai")}
                                    size="icon-lg"
                                    ariaLabel="Copy AI message"
                                    className="h-10 w-10"
                                />
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

                                {hoveredConnectorAction && (
                                    <>
                                        <line
                                            x1="100"
                                            y1="0"
                                            x2="100"
                                            y2={SPLIT_START_Y}
                                            stroke="currentColor"
                                            strokeWidth={LINE_WIDTH}
                                            className="text-gray-400/40 connector-comet-tail connector-comet-shared"
                                        />
                                        <line
                                            x1="100"
                                            y1="0"
                                            x2="100"
                                            y2={SPLIT_START_Y}
                                            stroke="currentColor"
                                            strokeWidth={LINE_WIDTH}
                                            className="text-gray-500/80 connector-comet-head connector-comet-shared"
                                        />
                                    </>
                                )}

                                {hoveredConnectorAction === "return" && options?.showReturn && (
                                    <>
                                        <path
                                            d={`M 100 ${SPLIT_START_Y} C 100 ${BTN_CY} 80 ${BTN_CY} ${LEFT_BTN_CX + 20} ${BTN_CY}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={LINE_WIDTH}
                                            className="text-gray-400/40 connector-comet-tail connector-comet-branch"
                                        />
                                        <path
                                            d={`M 100 ${SPLIT_START_Y} C 100 ${BTN_CY} 80 ${BTN_CY} ${LEFT_BTN_CX + 20} ${BTN_CY}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={LINE_WIDTH}
                                            className="text-gray-500/80 connector-comet-head connector-comet-branch"
                                        />
                                    </>
                                )}

                                {hoveredConnectorAction === "branch" && options?.showBranch && (
                                    <>
                                        <path
                                            d={`M 100 ${SPLIT_START_Y} C 100 35 ${RIGHT_BTN_CX} 25 ${RIGHT_BTN_CX} ${BTN_CY - 20}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={LINE_WIDTH}
                                            className="text-gray-400/40 connector-comet-tail connector-comet-branch"
                                        />
                                        <path
                                            d={`M 100 ${SPLIT_START_Y} C 100 35 ${RIGHT_BTN_CX} 25 ${RIGHT_BTN_CX} ${BTN_CY - 20}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={LINE_WIDTH}
                                            className="text-gray-500/80 connector-comet-head connector-comet-branch"
                                        />
                                    </>
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
                                    <Button
                                        variant="outline"
                                        size="icon-lg"
                                        type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-all hover:border-gray-300 hover:bg-[#F9FAFB]"
                                        onMouseEnter={() => setHoveredConnectorAction("return")}
                                        onMouseLeave={() => setHoveredConnectorAction(null)}
                                    >
                                        <Check className="h-5 w-5 text-black" />
                                    </Button>
                                </div>
                            )}

                            {options?.showBranch && (
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: RIGHT_BTN_CX, top: BTN_CY }}
                                >
                                    <Button
                                        variant="outline"
                                        size="icon-lg"
                                        type="button"
                                        onClick={() => onBranch?.(block.block_id)}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-all hover:border-gray-300 hover:bg-[#F9FAFB]"
                                        onMouseEnter={() => setHoveredConnectorAction("branch")}
                                        onMouseLeave={() => setHoveredConnectorAction(null)}
                                    >
                                        <MessageCircleQuestionMark
                                            className="h-5 w-5 text-black"
                                        />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}