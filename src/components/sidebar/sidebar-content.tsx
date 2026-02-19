"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat-history";

interface SidebarContentProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function SidebarContent({ isCollapsed, toggleSidebar }: SidebarContentProps) {
  const handleClose = () => {
    if (!isCollapsed) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={cn(
        "flex min-w-0 max-w-full flex-col h-full bg-muted/10 overflow-hidden",
        isCollapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* ヘッダーエリア */}
      <div className="flex items-center h-16 transition-all duration-300 pl-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="h-10 w-10 rounded-full shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* 新規チャットボタン */}
      <div className="px-4 pt-2 min-w-0">
        <NewChatButton isExpanded={!isCollapsed} onClick={handleClose} />
      </div>

      {/* 履歴リスト */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className={cn(
          "transition-opacity duration-300 min-w-0 w-full h-full",
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
            <ChatHistory onClickItem={handleClose} />
        </div>
      </div>

      <div className="pb-4" />
    </div>
  );
}