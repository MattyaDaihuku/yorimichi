"use client";

import { useState, Fragment, useEffect } from "react";
import { SplitWindow } from "@/components/chat/split-window";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

import { DeleteBranchButton } from "@/components/chat/delete-branch-button";
import { AddBranchButton } from "@/components/chat/add-branch-button";
import { useChatStore } from "@/store/chat-store";

// --- Helper Components ---

interface ChatPaneHelperProps {
  pane: { id: string; branchId: string };
  index: number;
  onRemove: (id: string) => void;
  className?: string; // Allow passing className for positioning/styling
}

const ChatPaneHelper = ({ pane, index, onRemove, className }: ChatPaneHelperProps) => {
  return (
    <div className={cn("h-full w-full bg-background border rounded-xl shadow-sm overflow-hidden relative", className)}>
      {/* Header Area (Minimal: only Delete button) */}
      <DeleteBranchButton
        onRemove={() => onRemove(pane.id)}
        className="absolute top-2 right-2 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      />

      {/* Chat Window Content */}
      <div className="h-full w-full overflow-hidden">
        <SplitWindow
          chatId="demo-chat-id"
          mockData={{ branches: [{ branch_id: pane.branchId }] }}
          className="h-full w-full border-none shadow-none rounded-none bg-transparent"
        />
      </div>
    </div>
  );
};

// --- Main Container ---

export function ChatUIContainer() {
  // Active Panes State: List of chat window IDs to show side-by-side.
  // Initialize with one pane.
  const [activePanes, setActivePanes] = useState<{ id: string; branchId: string }[]>([
    { id: "pane-1", branchId: "main" }
  ]);

  // モックデータをZustandのStoreに注入（デモ用）
  useEffect(() => {
    const branches: Record<string, any> = {
      main: {
        branch_id: "main",
        chat_id: "demo-chat-id",
        parent_branch_id: null,
        parent_block_id: null,
        branch_title: "Main Branch",
        status: "active",
        created_at: new Date(Date.now() - 100000).toISOString(),
        update_at: new Date().toISOString(),
      }
    };

    const blocks: Record<string, any> = {
      "block-main-1": {
        block_id: "block-main-1",
        branch_id: "main",
        user_content: "チャットAIの分岐（ブランチ機能）について教えてください。",
        ai_content: "はい。チャットAIのブランチ機能は、ある特定のメッセージから別の会話ルートを派生させる機能です。サブブランチでは、文脈を保ったまま別の話題を深掘りできます。",
        created_at: new Date(Date.now() - 90000).toISOString(),
        update_at: new Date().toISOString(),
      },
      "block-main-2": {
        block_id: "block-main-2",
        branch_id: "main",
        user_content: "サブブランチを切った後、メインブランチでそのまま会話を続けることはできますか？",
        ai_content: "いいえ、ブランチを切った後は、元のメインブランチで直接会話を続けることはできません。以降の会話は作成した新しいサブブランチ内でのみ進行します。メインブランチはあくまでも「過去の会話の記録（本筋）」として読み取り専用の状態で残ります。",
        created_at: new Date(Date.now() - 80000).toISOString(),
        update_at: new Date().toISOString(),
      }
    };

    activePanes.forEach((pane) => {
      if (pane.branchId === "main") return;

      const bId = pane.branchId;
      branches[bId] = {
        branch_id: bId,
        chat_id: "demo-chat-id",
        parent_branch_id: "main",
        parent_block_id: "block-main-1",
        branch_title: `Branch ${bId}`,
        status: "active",
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
      };

      blocks[`block-${bId}-1`] = {
        block_id: `block-${bId}-1`,
        branch_id: bId,
        user_content: `サブブランチからこんにちは！（ブランチID: ${bId}）`,
        ai_content: `こんにちは！こちらは**${bId}**のサブブランチです。「block-main-1」からフォークしているため、上のメッセージがその起点として表示されています。`,
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
      };
    });

    useChatStore.setState({
      chatData: {
        chat_id: "demo-chat-id",
        chat_title: "Demo Chat",
        created_at: new Date().toISOString(),
        branches,
        blocks,
      },
      isLoading: false,
      error: null,
    });
  }, [activePanes]);

  const addPane = () => {
    // Add a new pane
    const newId = `pane-${Date.now()}`;
    // デモ用に一意のブランチIDを発行して、別々の会話内容モックを表示させる
    const newBranchId = `sub-${activePanes.length}`;
    setActivePanes([...activePanes, { id: newId, branchId: newBranchId }]);
  };

  const removePane = (paneId: string) => {
    setActivePanes(activePanes.filter(p => p.id !== paneId));
  };

  return (
    // Changed: Removed p-2. Added flex-1, w-0 (width calculated from flex), max-w-full.
    <div className="flex flex-1 h-full min-w-0 max-w-full w-0 overflow-hidden bg-transparent">

      {/* 1. Mobile Layout (< md) - Horizontal Scroll */}
      {/* Removed pb-2, Added h-full, overflow-x-auto, overflow-y-hidden */}
      <div className="flex md:hidden w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-2">
        {activePanes.map((pane, index) => (
          <div key={pane.id} className="min-w-[85vw] max-w-[85vw] snap-center h-full flex-shrink-0">
            <ChatPaneHelper pane={pane} index={index} onRemove={removePane} />
          </div>
        ))}
        {/* Mobile Add Button */}
        {activePanes.length < 3 && (
          <div className="min-w-[60px] h-full flex items-center justify-center snap-center flex-shrink-0">
            <AddBranchButton onClick={addPane} className="w-12 h-12 rounded-full" />
          </div>
        )}
      </div>

      {/* 2. Desktop Layout (>= md) - Resizable Panels */}
      {/* Resizable Windows Area */}
      {activePanes.length > 0 && (
        <ResizablePanelGroup orientation="horizontal" className="hidden md:flex flex-1">
          {activePanes.map((pane, index) => (
            <Fragment key={pane.id}>
              <ResizablePanel defaultSize={100 / activePanes.length} minSize={25} className="relative group">
                <ChatPaneHelper pane={pane} index={index} onRemove={removePane} />
              </ResizablePanel>

              {/* Handle between panels - Transparent spacer */}
              {index < activePanes.length - 1 && <ResizableHandle className="bg-transparent w-2 shrink-0" />}
            </Fragment>
          ))}
        </ResizablePanelGroup>
      )}

      {/* 3. Desktop Add Button Area (Right Edge or Full UI) - Hide if >= 3 panes */}
      <div className="hidden md:flex">
        {activePanes.length < 3 && (
          <Fragment>
            {/* Spacer between windows and add button */}
            {activePanes.length > 0 && <div className="w-2 bg-transparent shrink-0" />}

            <AddBranchButton
              onClick={addPane}
              isFullWidth={activePanes.length === 0}
              className={activePanes.length === 0 ? "" : "w-12 shrink-0"}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
}
