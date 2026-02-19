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

  const mainBlocks = useMemo(() => {
    if (!chatData || !mainBranch) return [];

    return Object.values(chatData.blocks)
      .filter((block) => block.branch_id === mainBranch.branch_id)
      .sort(
        (first, second) =>
          new Date(first.created_at).getTime() - new Date(second.created_at).getTime()
      );
  }, [chatData, mainBranch]);

  const branchedBlockIds = useMemo(() => {
    if (!chatData || !mainBranch) return new Set<string>();

    return new Set(
      Object.values(chatData.branches)
        .filter(
          (branch) =>
            branch.parent_branch_id === mainBranch.branch_id &&
            typeof branch.parent_block_id === "string"
        )
        .map((branch) => branch.parent_block_id as string)
    );
  }, [chatData, mainBranch]);

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
              blocks={mainBlocks}
              branchedBlockIds={branchedBlockIds}
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