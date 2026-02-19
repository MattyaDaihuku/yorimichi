"use client";

import { Image as ImageIcon, Mic, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
