"use client";

import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat-history";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-10 w-10 rounded-full shrink-0 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white border-transparent" side="right" sideOffset={10}>
            <p>{isCollapsed ? "メニューを開く" : "メニューを閉じる"}</p>
          </TooltipContent>
        </Tooltip>
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-10 hover:bg-muted font-normal text-muted-foreground",
                isCollapsed ? "px-0" : "px-4"
              )}
              asChild
            >
              <Link
                href="/settings"
                className="flex items-center justify-start gap-2"
                onClick={handleClose}
              >
                <Settings className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span className="truncate">設定</span>}
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white border-transparent" side="right" sideOffset={10}>
            <p>設定とヘルプ</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
