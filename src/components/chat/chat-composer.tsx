"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Image as ImageIcon, Mic, Paperclip, Send, Square, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AVAILABLE_MODELS } from "@/lib/ai-active-model";
import { useModelStore } from "@/store/model-store";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ChatComposerProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => Promise<void>;
    onStop?: () => void;
    placeholder?: string;
    disabled?: boolean;
    isSending?: boolean;
    className?: string;
    alwaysBorder?: boolean;
};

export function ChatComposer({
    value,
    onChange,
    onSubmit,
    onStop,
    placeholder = "会話してみましょう",
    disabled = false,
    isSending = false,
    className,
    alwaysBorder = false,
}: ChatComposerProps) {
    const canSubmit = !!value.trim() && !disabled && !isSending;
    const selectedModel = useModelStore((state) => state.selectedModel);
    const setSelectedModel = useModelStore((state) => state.setSelectedModel);

    return (
        <div className={className}>
            <div
                className={`bg-white rounded-[28px] shadow-sm border transition-all p-4 ${alwaysBorder
                    ? "border-gray-200 focus-within:shadow-md"
                    : "border-transparent focus-within:shadow-md focus-within:border-gray-200"
                    }`}
            >
                <Textarea
                    suppressHydrationWarning
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full resize-none border-none outline-none text-lg bg-transparent min-h-[56px] max-h-[200px] placeholder:text-gray-400 focus-visible:ring-0 shadow-none"
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (canSubmit) {
                                void onSubmit();
                            }
                        }
                    }}
                />

                <div className="flex justify-between items-center mt-2">
                    <TooltipProvider>
                        <div className="hidden md:flex gap-1">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
                                        <Paperclip className="h-5 w-5 -rotate-45" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white border-transparent">
                                    <p>現在準備中です</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
                                        <ImageIcon className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white border-transparent">
                                    <p>現在準備中です</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
                                        <Mic className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white border-transparent">
                                    <p>現在準備中です</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        <div className="flex md:hidden gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48 bg-white z-50 rounded-xl shadow-lg border border-gray-200">
                                    <DropdownMenuItem disabled className="gap-2 text-gray-400 p-3">
                                        <Paperclip className="h-4 w-4 -rotate-45" />
                                        <span className="text-sm">ファイル添付 (準備中)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled className="gap-2 text-gray-400 p-3">
                                        <ImageIcon className="h-4 w-4" />
                                        <span className="text-sm">画像追加 (準備中)</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem disabled className="gap-2 text-gray-400 p-3">
                                        <Mic className="h-4 w-4" />
                                        <span className="text-sm">音声入力 (準備中)</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TooltipProvider>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 gap-1 rounded-full px-3 text-xs text-gray-700 hover:bg-gray-100"
                                >
                                    <span className="block max-w-[90px] sm:max-w-[120px] md:max-w-[170px] truncate">{selectedModel}</span>
                                    <ChevronDown className="ml-0 h-3.5 w-3.5 shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[170px] bg-white z-50 rounded-xl shadow-lg border border-gray-200 p-1.5 flex flex-col gap-1">
                                {AVAILABLE_MODELS.map((model) => {
                                    const isSelected = model === selectedModel;

                                    return (
                                        <DropdownMenuItem
                                            key={model}
                                            onClick={() => setSelectedModel(model)}
                                            className={`rounded-md px-3 py-2 text-sm transition-colors cursor-pointer ${isSelected
                                                ? "bg-gray-100 text-gray-900 font-medium"
                                                : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                                                }`}
                                        >
                                            {model}
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {isSending && onStop ? (
                            <Button
                                onClick={onStop}
                                size="icon"
                                className="rounded-full transition-all bg-gray-800 hover:bg-gray-900 text-white"
                                aria-label="生成を停止"
                            >
                                <Square className="h-3.5 w-3.5 fill-current" />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    if (canSubmit) {
                                        void onSubmit();
                                    }
                                }}
                                size="icon"
                                className={`rounded-full transition-all ${canSubmit
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-default"
                                    }`}
                            >
                                <Send className="h-4 w-4 rotate-45 -translate-x-[1px]" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
