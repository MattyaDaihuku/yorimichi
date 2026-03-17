"use client";

import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat-history";
import Link from "next/link";

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
          "transition-opacity min-w-0 w-full h-full",
          isCollapsed
            ? "opacity-0 pointer-events-none duration-0"
            : "opacity-100 duration-150"
        )}>
            <ChatHistory onClickItem={handleClose} />
        </div>
      </div>

      {/* 設定ボタン */}
      <div className="p-4 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center justify-start gap-2 h-10 hover:bg-muted font-normal text-muted-foreground",
                isCollapsed ? "px-0 justify-center" : "px-4"
              )}
            >
              <Settings className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="truncate">設定</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/settings" className="w-full cursor-pointer">
                パーソナライズ設定
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}