"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header"; // Headerをインポート
import { useUser } from "@clerk/nextjs";
import { mutate } from "swr";
import { ChatComposer } from "@/components/chat/chat-composer";
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
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();
  const router = useRouter();

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

  const readInitStreamAndValidate = async (res: Response) => {
    if (!res.body) {
      throw new Error("[500] AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let aiContent = "";
    let markerStatus: number | null = null;
    const markerRegex = /\[\[ERROR:(\d+)\]\]/g;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      let match: RegExpExecArray | null;
      while ((match = markerRegex.exec(chunk)) !== null) {
        markerStatus = Number(match[1]);
      }

      aiContent += chunk.replace(markerRegex, "");
    }

    if (markerStatus) {
      const markerMessage =
        markerStatus === 429
          ? "利用が集中しています。しばらく時間をおいて再度お試しください。"
          : "AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。";
      throw new Error(`[${markerStatus}] ${markerMessage}`);
    }

    if (aiContent.trim().length === 0) {
      throw new Error("[500] AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。");
    }
  };

  const revertInitializedChat = async (chatId: string) => {
    try {
      await fetch("/api/internal/chat/revert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId }),
      });
    } catch (revertError) {
      console.error("[ChatInitRevertFailed]", revertError);
    }
  };

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    const chatId = crypto.randomUUID();
    const branchId = crypto.randomUUID();
    const blockId = crypto.randomUUID();

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
          block_id: blockId,
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

      await readInitStreamAndValidate(res);

      setInput("");
      await mutate("/api/internal/chat/list");
      router.push(`/chat/${chatId}`);
    } catch (error) {
      await revertInitializedChat(chatId);
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

      <Header className="bg-[#F0F4F8]" />

      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[#F0F4F8] text-[#1F1F1F]">
        <div className="w-full max-w-3xl px-4 flex flex-col gap-8">
          
          {/* 挨拶エリア */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-4xl md:text-5xl font-medium tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent w-fit animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="text-[#c4c7c5]">こんにちは,</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{user?.fullName || "User"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-[#c4c7c5] tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
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
                className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left"
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