"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header"; // Headerをインポート
import { useChatStore } from "@/store/chat-store";
import { MainBranchView } from "@/components/chat/main-branch-view";
import { TopLinearLoader } from "@/components/chat/top-linear-loader";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { chatData, isLoading, error, fetchChat, clearChat } = useChatStore();
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const parseError = (err: unknown) => {
    const fallbackMessage = "送信中にエラーが発生しました。";

    if (err instanceof Error && err.message) {
      const match = err.message.match(/^\[(\d+)\]\s*(.*)$/);
      if (match) {
        return {
          code: Number(match[1]),
          message: match[2] || fallbackMessage,
        };
      }

      return { code: 500, message: err.message };
    }

    return { code: 500, message: fallbackMessage };
  };

  const revertInitializedChat = async () => {
    try {
      await fetch("/api/internal/chat/revert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: id }),
      });
    } catch (revertError) {
      console.error("[ChatInitRevertFailed]", revertError);
    }
  };

  const handleInitialSendError = async (sendError: unknown) => {
    const parsed = parseError(sendError);
    await revertInitializedChat();

    sessionStorage.setItem(
      "chat-init-error",
      JSON.stringify({ code: parsed.code, message: parsed.message })
    );

    void fetch("/api/internal/chat/list");
    router.replace("/");
  };

  useEffect(() => {
    try {
      const key = `pending-init:${id}`;
      const raw = sessionStorage.getItem(key);
      if (!raw) return;

      sessionStorage.removeItem(key);

      const parsed = JSON.parse(raw) as { message?: unknown };
      const pendingMessage =
        typeof parsed.message === "string" ? parsed.message.trim() : "";

      if (pendingMessage) {
        setInitialMessage(pendingMessage);
      }
    } catch (storageError) {
      console.error("[PendingInitReadFailed]", storageError);
    }
  }, [id]);

  useEffect(() => {
    clearChat();
    void fetchChat(id);
  }, [id, fetchChat, clearChat]);

  const mainBranch = useMemo(
    () =>
      Object.values(chatData?.branches ?? {}).find(
        (branch) => branch.depth === 0 && !branch.parent_branch_id
      ) ?? null,
    [chatData]
  );

  return (
    <>
      {/* 会話タイトルと白背景を指定 */}
      <Header title={chatData?.chat_title ?? ""} className="bg-background" />

      {isLoading && <TopLinearLoader />}

      <main className="flex-1 bg-background p-6">
        <div className="mx-auto max-w-4xl space-y-6 pb-10">
          {error && <p className="text-sm text-destructive">{error}</p>}

          {chatData && mainBranch && (
            <MainBranchView
              chatId={chatData.chat_id}
              branch={mainBranch}
              reload={() => fetchChat(id)}
              initialMessage={initialMessage}
              onInitialMessageHandled={() => setInitialMessage(null)}
              onInitialSendError={handleInitialSendError}
            />
          )}

          {chatData && !mainBranch && (
            <p className="text-sm text-muted-foreground">
              メインブランチが見つかりませんでした。
            </p>
          )}
        </div>
      </main>
    </>
  );
}