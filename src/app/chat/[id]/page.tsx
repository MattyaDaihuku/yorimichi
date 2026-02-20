"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header"; // Headerをインポート
import { useChatStore } from "@/store/chat-store";
import { MainBranchView } from "@/components/chat/main-branch-view";
import { SubBranchView } from "@/components/chat/sub-branch-view";
import { TopLinearLoader } from "@/components/chat/top-linear-loader";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { chatData, isLoading, error, fetchChat, clearChat } = useChatStore();
  const [creationContext, setCreationContext] = useState<{ parentBlockId: string } | undefined>();
  const [branchContext, setBranchContext] = useState<any>(null);
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

  const deepestBranch = useMemo(() => {
    if (!chatData?.branches) return null;
    return Object.values(chatData.branches).reduce((prev, current) => {
      return (current.depth > (prev?.depth ?? -1)) ? current : prev;
    }, null as any);
  }, [chatData]);

  const handleSwitchToSub = (blockId: string) => {
    const block = chatData?.blocks[blockId];
    if (block) {
      setBranchContext(chatData?.branches[block.branch_id] || null);
    }
    setCreationContext({ parentBlockId: blockId });
  };

  const handleCloseSubBranch = () => {
    setCreationContext(undefined);
    setBranchContext(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50/50">
      <Header title={chatData?.chat_title ?? ""} className="bg-background" />

      {isLoading && <TopLinearLoader />}

      <main className={`flex-1 bg-background ${(deepestBranch?.depth === 0 && !creationContext) ? "p-6 overflow-y-auto" : "overflow-hidden"}`}>
        <div className={`mx-auto h-full ${(deepestBranch?.depth === 0 && !creationContext) ? "max-w-4xl space-y-6 pb-10" : "max-w-none w-full"}`}>
          {error && <p className="text-sm text-destructive p-4">{error}</p>}

          {chatData && deepestBranch && (
            (deepestBranch.depth === 0 && !creationContext) ? (
              <MainBranchView
                chatId={chatData.chat_id}
                branch={deepestBranch}
                reload={() => fetchChat(id)}
                initialMessage={initialMessage}
                onInitialMessageHandled={() => setInitialMessage(null)}
                onInitialSendError={handleInitialSendError}
                onSwitchToSubBranch={handleSwitchToSub}
              />
            ) : (
              <div className="h-full w-full">
                <SubBranchView
                  key={creationContext?.parentBlockId || `load-${deepestBranch.branch_id}`}
                  chatId={chatData.chat_id}
                  mainBranch={branchContext || deepestBranch}
                  initialActiveBranchId={!creationContext ? deepestBranch.branch_id : undefined}
                  initialCreationContext={creationContext}
                  reload={() => fetchChat(id)}
                  onCloseAll={handleCloseSubBranch}
                  onBranch={handleSwitchToSub}
                />
              </div>
            )
          )}

          {chatData && !mainBranch && (
            <p className="text-sm text-muted-foreground">
              メインブランチが見つかりませんでした。
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
