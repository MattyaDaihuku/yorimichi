"use client";

import { use, useEffect, useMemo, useState } from "react";
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
  const { chatData, isLoading, error, fetchChat, clearChat } = useChatStore();
  const [creationContext, setCreationContext] = useState<{ parentBlockId: string } | undefined>();
  const [branchContext, setBranchContext] = useState<any>(null);

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
    <>
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
    </>
  );
}
