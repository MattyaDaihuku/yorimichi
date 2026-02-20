"use client";

import { use, useEffect, useMemo } from "react";
import { Header } from "@/components/header"; // Headerをインポート
import { useChatStore } from "@/store/chat-store";
import { MainBranchView } from "@/components/chat/main-branch-view";
import { TopLinearLoader } from "@/components/chat/top-linear-loader";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const { chatData, isLoading, error, fetchChat, clearChat } = useChatStore();

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
    // <>
    //   {/* 会話タイトルと白背景を指定 */}
    //   <Header title={id} className="bg-background" />

    //   <p>a</p>
    // </>

    <div className="flex flex-col h-screen w-full bg-gray-50/50">
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