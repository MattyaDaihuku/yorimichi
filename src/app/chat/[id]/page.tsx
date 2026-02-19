"use client";

import { use, useEffect, useMemo } from "react";
import { Header } from "@/components/header"; // Headerをインポート
import { useChatStore } from "@/store/chat-store";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const { chatData, isLoading, error, fetchChat } = useChatStore();

  useEffect(() => {
    void fetchChat(id);
  }, [id, fetchChat]);

  const branchMap = chatData?.branches ?? {};
  const blockList = useMemo(
    () =>
      Object.values(chatData?.blocks ?? {}).sort(
        (first, second) =>
          new Date(first.created_at).getTime() - new Date(second.created_at).getTime()
      ),
    [chatData]
  );

  const branchCount = Object.keys(branchMap).length;

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

          {chatData && (
            <>
              <section className="rounded-xl border bg-muted/20 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Branches（会話の分岐）
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">分岐数: {branchCount}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {Object.values(branchMap).map((branch) => (
                    <li key={branch.branch_id} className="rounded-md border bg-background p-3">
                      <p className="font-medium">{branch.branch_title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        status: {branch.status} / depth: {branch.depth}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-xl border bg-muted/20 p-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Blocks（ユーザー質問 + AI回答）
                </h2>
                <div className="mt-3 space-y-3">
                  {blockList.map((block) => (
                    <article key={block.block_id} className="rounded-md border bg-background p-3">
                      <p className="text-xs font-semibold text-primary">User</p>
                      <p className="mt-1 text-sm whitespace-pre-wrap">{block.user_content}</p>
                      <p className="mt-3 text-xs font-semibold text-emerald-600">AI</p>
                      <p className="mt-1 text-sm whitespace-pre-wrap">{block.ai_content}</p>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}