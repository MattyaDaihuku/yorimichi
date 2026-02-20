"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Image as ImageIcon, Mic, Paperclip, Send } from "lucide-react";
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

type ChatComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void>;
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
    placeholder = "質問を入力する",
    disabled = false,
    isSending = false,
    className,
    alwaysBorder = false,
}: ChatComposerProps) {
    const canSubmit = !!value.trim() && !disabled && !isSending;
    const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
    const modelMenuRef = useRef<HTMLDivElement | null>(null);
    const selectedModel = useModelStore((state) => state.selectedModel);
    const setSelectedModel = useModelStore((state) => state.setSelectedModel);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!modelMenuRef.current) return;
            if (!modelMenuRef.current.contains(event.target as Node)) {
                setIsModelMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={className}>
            <div
                className={`bg-white rounded-[28px] shadow-sm border transition-all p-4 ${
                    alwaysBorder
                        ? "border-gray-200 focus-within:shadow-md"
                        : "border-transparent focus-within:shadow-md focus-within:border-gray-200"
                }`}
            >
                <Textarea
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
                        <div className="flex gap-1">
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
                    </TooltipProvider>

                    <div className="flex items-center gap-2">
                        <div ref={modelMenuRef} className="relative">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-1 rounded-full px-3 text-xs leading-4 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsModelMenuOpen((prev) => !prev)}
                            >
                                <span className="max-w-[170px] truncate leading-4">{selectedModel}</span>
                                <ChevronDown className="ml-0 h-3.5 w-3.5" />
                            </Button>

                            {isModelMenuOpen && (
                                <div className="absolute right-0 bottom-11 z-20 min-w-[170px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                                    {AVAILABLE_MODELS.map((model) => {
                                        const isSelected = model === selectedModel;

                                        return (
                                            <Button
                                                key={model}
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedModel(model);
                                                    setIsModelMenuOpen(false);
                                                }}
                                                className={`h-auto w-full justify-start rounded-none px-3 py-2 text-left text-sm transition-colors ${
                                                    isSelected
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {model}
                                            </Button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={() => {
                                if (canSubmit) {
                                    void onSubmit();
                                }
                            }}
                            size="icon"
                            className={`rounded-full transition-all ${
                                canSubmit
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-default"
                            }`}
                        >
                            <Send className="h-4 w-4 rotate-45 -translate-x-[1px]" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
