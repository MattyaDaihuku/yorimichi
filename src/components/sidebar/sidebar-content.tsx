"use client";

import { Button } from "@/components/ui/button";
import { Menu, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewChatButton } from "./new-chat-button";
import { ChatHistory } from "./chat-history";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SettingsDialog } from "@/components/settings/settings-dialog";
import { useState } from "react";

interface SidebarContentProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  onOpenSettings?: () => void;
}

export function SidebarContent({ isCollapsed, toggleSidebar, onOpenSettings }: SidebarContentProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
              size={isCollapsed ? "icon" : "default"}
              onClick={toggleSidebar}
              className={cn(
                "h-10 shrink-0 text-muted-foreground hover:text-foreground hover:bg-[#D2D9E1] dark:hover:bg-sidebar-accent",
                isCollapsed ? "w-10 rounded-full" : "w-10 rounded-full" // hamburger is always an icon, but kept class structure
              )}
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
                "relative group flex items-center justify-start overflow-hidden transition-all duration-300 border-none",
                "h-10 p-0 text-muted-foreground hover:text-foreground hover:bg-[#D2D9E1] dark:hover:bg-sidebar-accent",
                !isCollapsed ? "w-full rounded-full" : "w-10 rounded-full"
              )}
              onClick={() => {
                if (onOpenSettings) {
                  onOpenSettings();
                } else {
                  setIsSettingsOpen(true);
                }
                handleClose();
              }}
            >
              <div className="flex items-center justify-center shrink-0 h-10 w-10">
                <Settings className="h-5 w-5" />
              </div>
              <span className={cn(
                "whitespace-nowrap transition-all duration-300 ease-in-out pr-4 font-medium",
                !isCollapsed ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
              )}>
                設定
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-black text-white border-transparent" side="right" sideOffset={10}>
            <p>設定とヘルプ</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {!onOpenSettings && <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />}
    </div>
  );
}
