"use client";

import { useState, Fragment } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "@/components/chat/chat-window";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
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
import { cn } from "@/lib/utils";


// Mock data generator for demo purposes
const createMockChatData = (branchId: string, index: number) => ({
  chat_id: "demo-chat-id",
  user_id: "user-1",
  main_branch_id: "main",
  is_pinned: false,
  chat_title: "Demo Chat",
  created_at: new Date().toISOString(),
  update_at: new Date().toISOString(),
  branches: [
    {
      branch_id: branchId,
      chat_id: "demo-chat-id",
      parent_branch_id: branchId === "main" ? null : "main",
      parent_block_id: null,
      branch_title: branchId === "main" ? "Main" : `Branch ${branchId}`,
      status: 'active' as const,
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    }
  ],
  blocks: [
    {
      block_id: `block-${index}-1`,
      branch_id: branchId,
      user_content: `Hello from ${branchId}`,
      ai_content: `This is a conversation in **${branchId}**.`,
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    },
    {
      block_id: `block-${index}-2`,
      branch_id: branchId,
      user_content: "Reviewing layout...",
      ai_content: "The split view layout allows comparing branches side-by-side.",
      created_at: new Date().toISOString(),
      update_at: new Date().toISOString(),
    }
  ]
});

// --- Helper Components (Defined locally to avoid file clutter) ---

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
            <AlertDialogTitle>ブランチ削除の確認</AlertDialogTitle>
            <AlertDialogDescription>
              本当にこのブランチを削除しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!flex-row justify-end gap-2">
            <AlertDialogCancel className="mt-0">キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onRemove(pane.id)}
              variant="destructive"
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Chat Window Content */}
      <div className="h-full w-full overflow-hidden">
        <ChatWindow
          chatId="demo-chat-id"
          mockData={createMockChatData(pane.branchId, index)}
          className="h-full w-full border-none shadow-none rounded-none bg-transparent"
        />
      </div>
    </div>
  );
};

interface AddWindowButtonHelperProps {
  onClick: () => void;
  isFullWidth?: boolean;
  className?: string;
}

const AddWindowButtonHelper = ({ onClick, isFullWidth, className }: AddWindowButtonHelperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-muted/30 border-2 border-dashed border-muted-foreground/40 rounded-4xl shadow-sm hover:bg-muted/80 transition-colors cursor-pointer group",
        isFullWidth ? "flex-1 w-full h-full" : "w-12 shrink-0",
        className
      )}
      onClick={onClick}
      title="Add window"
    >
      <Plus className="w-6 h-6 text-muted-foreground/60" />
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

  const addPane = () => {
    // Add a new pane
    const newId = `pane-${Date.now()}`;
    // For demo purposes, we just assign a branch ID to show *some* content, even without navigation.
    // We can cycle or random, or just static. Let's keep it simple.
    setActivePanes([...activePanes, { id: newId, branchId: "main" }]);
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
            <AddWindowButtonHelper onClick={addPane} className="w-12 h-12 rounded-full" />
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

            <AddWindowButtonHelper
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
