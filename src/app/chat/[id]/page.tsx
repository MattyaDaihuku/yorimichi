"use client";

import { use, useEffect, useMemo } from "react";
import { Header } from "@/components/header"; // Headerをインポート
import { useChatStore } from "@/store/chat-store";
import { MainBranchView } from "@/components/chat/main-branch-view";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const { chatData, isLoading, error, fetchChat } = useChatStore();

  useEffect(() => {
    void fetchChat(id);
  }, [id, fetchChat]);

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
      <Header title={chatData?.chat_title ?? id} className="bg-background" />

      <main className="flex-1 bg-background p-6">
        <div className="mx-auto max-w-4xl space-y-6 pb-10">
          {isLoading && (
            <p className="text-sm text-muted-foreground">会話を読み込み中です...</p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          {chatData && mainBranch && (
            <MainBranchView
              chatId={chatData.chat_id}
              branch={mainBranch}
              reload={() => fetchChat(id)}
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