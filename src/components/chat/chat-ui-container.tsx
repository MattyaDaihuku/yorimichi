"use client";

import { useState, Fragment, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useChatStore, getHistoryFromChatData } from "@/store/chat-store";
import { ChatWindow } from "@/components/chat/chat-window";
import { ChatComposer } from "@/components/chat/chat-composer";
import { MessageBlock, type ConnectorConfig } from "@/components/chat/message-block";
import { toast } from "sonner";
import { sendMessageWithStreaming, type StreamingBlock } from "@/lib/chat-send";
import { DeleteBranchButton } from "@/components/chat/delete-branch-button";
import { AddBranchButton } from "@/components/chat/add-branch-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface ChatUIContainerProps {
  chatId: string;
  mainBranchId: string;
  initialActiveBranchId?: string;
  initialCreationContext?: { parentBlockId: string };
  reload: () => Promise<void>;
  onCloseAll: () => void;
  onBranch: (blockId: string) => void;
}

type PaneConfig = {
  id: string;
  branchId?: string;
  creationContext?: { parentBlockId: string };
};

// --- Creation Pane Component ---

interface CreationPaneProps {
  chatId: string;
  parentBlockId: string;
  reload: () => Promise<void>;
  onCreated: (newBranchId: string) => void;
}

const CreationPane = ({ chatId, parentBlockId, reload, onCreated }: CreationPaneProps) => {
  const chatData = useChatStore((state) => state.chatData);
  const setCurrentIds = useChatStore((state) => state.setCurrentIds);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");

  const parentBlock = chatData?.blocks[parentBlockId];

  const handleCreate = async () => {
    if (!message.trim() || !chatData) return;
    setIsCreating(true);

    try {
      const parentBlock = chatData.blocks[parentBlockId];
      if (!parentBlock) throw new Error("Block not found");

      const history = getHistoryFromChatData(chatData, parentBlockId);
      const branchId = crypto.randomUUID();
      const blockId = crypto.randomUUID();

      setCurrentIds({ branchId, blockId });

      const parentBranch = chatData.branches[parentBlock.branch_id];
      const branchDepth = (parentBranch?.depth ?? 0) + 1;

      const response = await fetch("/api/internal/branch/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch_id: branchId,
          chat_id: chatId,
          parent_branch_id: parentBlock.branch_id,
          parent_block_id: parentBlock.block_id,
          block_id: blockId,
          depth: branchDepth,
          message,
          history
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to create branch");
      }

      const reader = response.body?.getReader();
      if (reader) {
        while (true) {
          const { done } = await reader.read();
          if (done) break;
        }
      }

      toast.success("ブランチを作成しました");
      await reload();
      onCreated(branchId);
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "作成に失敗しました";
      toast.error(msg);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {parentBlock && (
          <div className="max-w-3xl mx-auto opacity-80 origin-top pt-4">
            <MessageBlock
              block={parentBlock}
              connector={{
                style: "straight",
                type: "continue"
              }}
            />
          </div>
        )}
      </div>
      <div className="p-4 border-t bg-white relative z-10">
        <ChatComposer
          value={message}
          onChange={setMessage}
          onSubmit={handleCreate}
          isSending={isCreating}
          placeholder="新しいブランチでメッセージを送信..."
          alwaysBorder={true}
        />
      </div>
    </div>
  );
};

// --- Helper Components ---

interface ChatPaneHelperProps {
  pane: PaneConfig;
  onRemove: (id: string) => void;
  chatId: string;
  reload: () => Promise<void>;
  onPaneConfigUpdate: (id: string, config: Partial<PaneConfig>) => void;
  onBranch: (blockId: string) => void;
  mainBranchId: string;
  className?: string;
}

const ChatPaneHelper = ({ pane, onRemove, chatId, reload, onPaneConfigUpdate, onBranch, mainBranchId, className }: ChatPaneHelperProps) => {
  const [streamingBlock, setStreamingBlock] = useState<StreamingBlock | null>(null);
  const chatData = useChatStore((state) => state.chatData);
  const removeBranch = useChatStore((state) => state.removeBranch);

  const handleSend = async (message: string) => {
    if (!pane.branchId) return;

    const currentBranchBlocks = Object.values(chatData?.blocks ?? {})
      .filter((block) => block.branch_id === pane.branchId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(a.created_at).getTime());

    const history = currentBranchBlocks.flatMap((block) => [
      { role: "user" as const, content: block.user_content },
      { role: "assistant" as const, content: block.ai_content },
    ]);

    await sendMessageWithStreaming({
      chatId,
      branchId: pane.branchId,
      message,
      model: "gemini-2.5-flash", // Use default model
      history,
      reload,
      setStreamingBlock,
    });
  };

  const handleDelete = async () => {
    if (!pane.branchId) {
      onRemove(pane.id);
      return;
    }

    try {
      const response = await fetch("/api/internal/branch/trash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trash_branch_id: pane.branchId })
      });

      if (!response.ok) {
        throw new Error("Failed to delete branch");
      }

      toast.success("ブランチを削除しました");
      removeBranch(pane.branchId);
      onRemove(pane.id);
      void reload();
    } catch (error) {
      console.error(error);
      toast.error("削除に失敗しました");
    }
  };

  return (
    <div className={cn("h-full w-full bg-background relative group flex flex-col", className)}>
      {/* Header Area using common DeleteBranchButton logic but customized for close behavior */}
      {(pane.branchId || pane.creationContext) && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-destructive/10 backdrop-blur-sm border shadow-sm transition-colors z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              title="Delete window"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="min-w-0 w-[400px] sm:max-w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle>表示の確認</AlertDialogTitle>
              <AlertDialogDescription>
                {pane.branchId ? "本当にこのブランチを削除しますか？" : "このウィンドウを削除しますか？"} 
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="!flex-row justify-end gap-2">
              <AlertDialogCancel className="mt-0">キャンセル</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                variant="destructive"
              >
                {pane.branchId ? "削除" : "削除"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Chat Content */}
      <div className="flex-1 min-h-0 w-full overflow-hidden">
        {pane.branchId ? (
          <div className="h-full flex flex-col min-h-0">
            <ChatWindow
              branchId={pane.branchId}
              fixedInput
              fixedOffsetClassName="relative left-auto right-auto top-auto bottom-auto"
              streamingBlock={streamingBlock}
              onSend={handleSend}
              onBranch={onBranch}
              flexLayout={true}
            />
          </div>
        ) : pane.creationContext ? (
          <CreationPane
            chatId={chatId}
            parentBlockId={pane.creationContext.parentBlockId}
            reload={reload}
            onCreated={(newBranchId) => onPaneConfigUpdate(pane.id, { branchId: newBranchId, creationContext: undefined })}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a branch
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Container ---

export function ChatUIContainer({ chatId, mainBranchId, initialActiveBranchId, initialCreationContext, reload, onCloseAll, onBranch }: ChatUIContainerProps) {
  const chatData = useChatStore((state) => state.chatData);
  const [activePanes, setActivePanes] = useState<PaneConfig[]>(() => {
    const panes: PaneConfig[] = [];

    if (initialCreationContext && chatData) {
      const parentBlockId = initialCreationContext.parentBlockId;
      const siblings = Object.values(chatData.branches)
        .filter(b => b.parent_block_id === parentBlockId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 2);

      siblings.reverse().forEach(s => {
        panes.push({ id: `pane-${s.branch_id}`, branchId: s.branch_id });
      });

      panes.push({ id: "pane-create-initial", creationContext: initialCreationContext });
    } else {
      if (initialActiveBranchId && chatData) {
        const currentBranch = chatData.branches[initialActiveBranchId];
        if (currentBranch?.parent_block_id) {
          const siblings = Object.values(chatData.branches)
            .filter(b => b.parent_block_id === currentBranch.parent_block_id)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 3);

          siblings.reverse().forEach(s => {
            panes.push({ id: `pane-${s.branch_id}`, branchId: s.branch_id });
          });
        } else {
          panes.push({ id: "pane-initial", branchId: initialActiveBranchId });
        }
      } else if (initialActiveBranchId) {
        panes.push({ id: "pane-initial", branchId: initialActiveBranchId });
      }

      if (initialCreationContext) {
        panes.push({ id: "pane-create-1", creationContext: initialCreationContext });
      }
    }

    return panes;
  });

  const addPane = () => {
    if (activePanes.length >= 3) return;
    const existingCreation = activePanes.find(p => p.creationContext);
    let context = existingCreation?.creationContext || initialCreationContext;

    if (!context && activePanes.length > 0 && chatData) {
      const lastPane = activePanes[activePanes.length - 1];
      if (lastPane.branchId) {
        const branch = chatData.branches[lastPane.branchId];
        if (branch?.parent_block_id) {
          context = { parentBlockId: branch.parent_block_id };
        }
      }
    }

    if (context) {
      setActivePanes([...activePanes, { id: `pane-add-${Date.now()}`, creationContext: context }]);
    }
  };

  const removePane = (paneId: string) => {
    if (activePanes.length <= 1) {
      onCloseAll();
      return;
    }
    setActivePanes(activePanes.filter(p => p.id !== paneId));
  };

  const handleBranch = (blockId: string) => {
    onBranch(blockId);
  };

  const updatePaneConfig = (id: string, newConfig: Partial<PaneConfig>) => {
    setActivePanes(prev => prev.map(p => p.id === id ? { ...p, ...newConfig } : p));
  };

  return (
    <div className="flex flex-1 h-full w-full overflow-hidden bg-transparent">
      {/* 1. Mobile Layout */}
      <div className="flex md:hidden w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-2 p-2">
        {activePanes.map((pane) => (
          <div key={pane.id} className="min-w-[85vw] max-w-[85vw] snap-center h-full flex-shrink-0">
            <ChatPaneHelper
              pane={pane}
              onRemove={removePane}
              chatId={chatId}
              reload={reload}
              onPaneConfigUpdate={updatePaneConfig}
              onBranch={handleBranch}
              mainBranchId={mainBranchId}
            />
          </div>
        ))}
        {activePanes.length < 3 && (
          <div className="min-w-[60px] h-full flex items-center justify-center snap-center flex-shrink-0">
            <AddBranchButton onClick={addPane} className="w-12 h-12 rounded-full" />
          </div>
        )}
      </div>

      {/* 2. Desktop Layout */}
      {activePanes.length > 0 && (
        <ResizablePanelGroup orientation="horizontal" className="hidden md:flex flex-1">
          {activePanes.map((pane, index) => (
            <Fragment key={pane.id}>
              <ResizablePanel defaultSize={100 / activePanes.length} minSize={25} className="relative group">
                <ChatPaneHelper
                  pane={pane}
                  onRemove={removePane}
                  chatId={chatId}
                  reload={reload}
                  onPaneConfigUpdate={updatePaneConfig}
                  onBranch={handleBranch}
                  mainBranchId={mainBranchId}
                />
              </ResizablePanel>
              {index < activePanes.length - 1 && <ResizableHandle className="bg-transparent w-2 shrink-0" />}
            </Fragment>
          ))}
        </ResizablePanelGroup>
      )}

      {/* 3. Desktop Add Button Area */}
      <div className="hidden md:flex">
        {activePanes.length < 3 && (
          <Fragment>
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
