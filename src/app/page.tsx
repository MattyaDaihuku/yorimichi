"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { useUser, useClerk } from "@clerk/nextjs";
import { mutate } from "swr";
import { ChatComposer } from "@/components/chat/chat-composer";
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

export default function Home() {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const setCurrentIds = useChatStore((state) => state.setCurrentIds);

  const parseError = (error: unknown) => {
    const fallbackMessage = "会話の開始に失敗しました。";
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

    return { parsedCode, parsedMessage };
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("chat-init-error");
    if (!raw) return;

    sessionStorage.removeItem("chat-init-error");

    try {
      const parsed = JSON.parse(raw) as { code?: unknown; message?: unknown };
      setErrorCode(typeof parsed.code === "number" ? parsed.code : null);
      setErrorMessage(
        typeof parsed.message === "string" && parsed.message.trim().length > 0
          ? parsed.message
          : "会話の開始に失敗しました。"
      );
      setErrorOpen(true);
    } catch (parseError) {
      console.error("[ChatInitErrorParseFailed]", parseError);
    }
  }, []);

  // ログイン後のプロンプト復元
  useEffect(() => {
    if (isLoaded && user) {
      const savedPrompt = localStorage.getItem("guest_prompt");
      if (savedPrompt) {
        setInput(savedPrompt);
        localStorage.removeItem("guest_prompt");
      }
    }
  }, [isLoaded, user]);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    // 未ログインの場合はモーダルを表示
    if (!user) {
      // ログイン後に復元するために入力内容を保存
      localStorage.setItem("guest_prompt", message);
      openSignIn({
        appearance: {
          elements: {
            modalBackdrop: {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
            modalCloseButton: {
              outline: "none",
              boxShadow: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              }
            }
          }
        }
      });
      return;
    }

    const chatId = crypto.randomUUID();
    const branchId = crypto.randomUUID();
    const blockId = crypto.randomUUID();

    setCurrentIds({ chatId, branchId, blockId });

    setIsSending(true);

    try {
      const res = await fetch("/api/internal/chat/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          branch_id: branchId,
          message,
        }),
      });

      if (!res.ok) {
        const payload = await res
          .json()
          .catch(() => ({ error: "会話の開始に失敗しました。" }));

        const messageText =
          typeof payload?.error === "string"
            ? payload.error
            : "会話の開始に失敗しました。";

        throw new Error(`[${res.status}] ${messageText}`);
      }

      sessionStorage.setItem(
        `pending-init:${chatId}`,
        JSON.stringify({ message })
      );

      setInput("");
      router.push(`/chat/${chatId}`);
      void mutate("/api/internal/chat/list");
    } catch (error) {
      const { parsedCode, parsedMessage } = parseError(error);
      setErrorCode(parsedCode);
      setErrorMessage(parsedMessage);
      setErrorOpen(true);
    } finally {
      setIsSending(false);
    }
  };

  const retryMessage = "しばらく時間をおいて再度お試しください。";
  const shouldShowRetryMessage = !errorMessage.includes(retryMessage);

  function Spinner({ className = "" }: { className?: string }) {
    return (
      <span
        aria-label="loading"
        className={`inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#c4c7c5]/35 border-t-[#c4c7c5] ${className}`}
      />
    );
  }

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

      <Header className="bg-[#F0F4F8] dark:bg-background" />

      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[#F0F4F8] dark:bg-background text-[#1F1F1F] dark:text-foreground">
        <div className="w-full max-w-3xl px-4 flex flex-col gap-8">

          {/* 挨拶エリア */}
          <div className="space-y-0">
            <h1 className="text-3xl md:text-4xl leading-[1.2] font-medium tracking-tight">
              {!isMounted || !isLoaded ? (
                <span className="inline-flex h-[1.2em] items-center">
                  <Spinner className="block h-8 w-8" />
                </span>
              ) : (
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {user?.fullName || "ゲスト"}
                </span>
              )}
              <span className="ml-1 text-[#c4c7c5]">さん</span>
            </h1>
            <h1 className="text-4xl md:text-5xl leading-[1.2] font-medium text-[#c4c7c5] tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              何から始めますか？
            </h1>
          </div>

          {/* 入力エリア */}
          <div className="relative w-full group animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <ChatComposer
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              isSending={isSending}
            />
          </div>

          {/* サジェストチップ */}
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            {["一日を盛り上げる", "知識をサクッと吸収", "やる気を引き出す", "アイデアの壁打ち"].map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="ghost"
                className="px-4 py-2 bg-white dark:bg-input/50 rounded-xl text-sm font-medium text-gray-600 dark:text-white hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
