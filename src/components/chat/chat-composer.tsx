"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Image as ImageIcon, Mic, Paperclip, Send, Square, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useModelStore } from "@/store/model-store";
import {
    AVAILABLE_MODELS,
    ACTIVE_MODEL,
    MODEL_DISPLAY_CONFIG,
    PROVIDER_LABELS,
    type AiModel,
    type ModelProvider,
} from "@/lib/ai-active-model";
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
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSettingsDialogStore } from "@/store/settings-dialog-store";

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
    const settingsDialog = useSettingsDialogStore();
    const canSubmit = !!value.trim() && !disabled && !isSending;
    const selectedModel = useModelStore((state) => state.selectedModel);
    const setSelectedModel = useModelStore((state) => state.setSelectedModel);

    // 登録済みプロバイダのSet（"google", "openai", "anthropic"）
    const [registeredProviders, setRegisteredProviders] = useState<Set<string>>(new Set());
    const [showKeyDialog, setShowKeyDialog] = useState(false);

    /** APIキーの状態を取得する */
    const fetchApiKeyStatus = () => {
        fetch("/api/user/apikeys")
            .then((res) => res.json())
            .then((data) => {
                if (data.keys) {
                    const providers = new Set<string>();
                    if (data.keys.google) providers.add("google");
                    if (data.keys.openai) providers.add("openai");
                    if (data.keys.anthropic) providers.add("anthropic");
                    setRegisteredProviders(providers);

                }
            })
            .catch((err) => console.error("Failed to fetch API keys status:", err));
    };

    // 初回マウント時に取得
    useEffect(() => {
        fetchApiKeyStatus();
    }, []);

    /** デフォルトモデルしか使えない状態か */
    const isDefaultOnly = registeredProviders.size === 0;

    /** モデルが利用可能かどうかを判定 */
    const isModelAvailable = (model: AiModel): boolean => {
        // APIキー未登録時は無料モデルのみ利用可能
        if (isDefaultOnly) return model === ACTIVE_MODEL;
        // APIキーが1つでもあれば、登録済みプロバイダのモデルのみ利用可能
        return registeredProviders.has(MODEL_DISPLAY_CONFIG[model].provider);
    };

    /** ボタンに表示するモデル名（④ 表示名を使用） */
    const displayModelName = isDefaultOnly
        ? "default"
        : MODEL_DISPLAY_CONFIG[selectedModel]?.displayName ?? selectedModel;

    // APIキー状態の変化で現在の選択モデルが利用不可になった場合、自動で切り替え
    useEffect(() => {
        if (isDefaultOnly) {
            setSelectedModel(ACTIVE_MODEL);
            return;
        }
        if (!isModelAvailable(selectedModel)) {
            const firstAvailable = AVAILABLE_MODELS.find(m => isModelAvailable(m));
            if (firstAvailable) setSelectedModel(firstAvailable);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registeredProviders]);

    /** モデルクリック時の処理 */
    const handleModelSelect = (model: AiModel) => {
        if (isModelAvailable(model)) {
            setSelectedModel(model);
        } else {
            setShowKeyDialog(true);
        }
    };

    /** ③ 登録済みプロバイダのモデルだけを表示するグループを動的に生成 */
    const visibleGroups = (["google", "openai", "anthropic"] as ModelProvider[])
        .map(provider => ({
            provider,
            label: PROVIDER_LABELS[provider],
            models: AVAILABLE_MODELS.filter(m =>
                MODEL_DISPLAY_CONFIG[m].provider === provider && isModelAvailable(m)
            ),
        }))
        .filter(group => group.models.length > 0);

    return (
        <div className={className}>
            <div
                className={`bg-white dark:bg-transparent rounded-[28px] shadow-sm dark:shadow-none border transition-all p-4 ${alwaysBorder
                    ? "border-gray-200 dark:border-border focus-within:shadow-md dark:focus-within:shadow-none"
                    : "border-transparent focus-within:shadow-md dark:focus-within:shadow-none focus-within:border-gray-200 dark:focus-within:border-gray-700"
                    }`}
            >
                <Textarea
                    suppressHydrationWarning
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full resize-none border-none outline-none text-lg bg-transparent dark:bg-transparent min-h-[56px] max-h-[200px] placeholder:text-gray-400 focus-visible:ring-0 shadow-none"
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
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <Paperclip className="h-5 w-5 -rotate-45" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white border-transparent">
                                    <p>現在準備中です</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <ImageIcon className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black text-white border-transparent">
                                    <p>現在準備中です</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
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
                                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <Plus className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48 bg-white dark:bg-popover z-50 rounded-xl shadow-lg border border-gray-200 dark:border-border">
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
                        <DropdownMenu onOpenChange={(open) => { if (open) fetchApiKeyStatus(); }}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-9 gap-1 rounded-full px-3 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <span className="block max-w-[90px] sm:max-w-[120px] md:max-w-[170px] truncate">{displayModelName}</span>
                                    <ChevronDown className="ml-0 h-3.5 w-3.5 shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-[260px] max-h-[320px] overflow-y-auto bg-white z-50 rounded-xl shadow-lg border border-gray-200 p-1.5 flex flex-col">
                                {isDefaultOnly ? (
                                    <div
                                        onClick={() => settingsDialog.open("api")}
                                        className="rounded-md px-3 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                                            <Settings className="h-3.5 w-3.5" />
                                            <span>APIキーを設定する</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed pl-[22px]">
                                            APIキーを登録すると、GPT-4oやClaude 3.5など多様なモデルが利用できます
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {visibleGroups.map((group, groupIndex) => (
                                            <div key={group.provider}>
                                                {groupIndex > 0 && <DropdownMenuSeparator className="my-1" />}
                                                <DropdownMenuLabel className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                                    {group.label}
                                                </DropdownMenuLabel>
                                                {group.models.map((model) => {
                                                    const isSelected = model === selectedModel;

                                                    return (
                                                        <DropdownMenuItem
                                                            key={model}
                                                            onClick={() => handleModelSelect(model)}
                                                            className={`rounded-md px-3 py-2 text-sm transition-colors cursor-pointer ${isSelected
                                                                ? "bg-gray-100 text-gray-900 font-medium"
                                                                : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                                                                }`}
                                                        >
                                                            {MODEL_DISPLAY_CONFIG[model].displayName}
                                                        </DropdownMenuItem>
                                                    );
                                                })}
                                            </div>
                                        ))}

                                        <DropdownMenuSeparator className="my-1" />
                                        <div
                                            onClick={() => settingsDialog.open("api")}
                                            className="rounded-md px-3 py-3 cursor-pointer hover:bg-blue-50 transition-colors"

                                        >
                                            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                                                <Settings className="h-3.5 w-3.5" />
                                                <span>APIキーを設定する</span>
                                            </div>
                                            <p className="text-[11px] text-gray-400 mt-1 leading-relaxed pl-[22px]">
                                                他のプロバイダのモデルを追加できます
                                            </p>
                                        </div>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {isSending && onStop ? (
                            <Button
                                onClick={onStop}
                                size="icon"
                                className="rounded-full transition-all bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-400"
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
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-default"
                                    }`}
                            >
                                <Send className="h-4 w-4 rotate-45 -translate-x-[1px]" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <AlertDialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>APIキー登録画面に移動しますか？</AlertDialogTitle>
                        <AlertDialogDescription>
                            このモデルを利用するにはAPIキーの登録が必要です。APIキー設定画面に移動して登録しますか？
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>キャンセル</AlertDialogCancel>
                        <AlertDialogAction onClick={() => settingsDialog.open("api")}>
                            はい、移動する
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
