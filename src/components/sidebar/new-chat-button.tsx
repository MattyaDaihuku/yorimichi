"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewChatButtonProps {
  isExpanded: boolean;
  onClick?: () => void;
}

export function NewChatButton({ isExpanded, onClick }: NewChatButtonProps) {
  const router = useRouter();

  const handleNewChat = () => {
    // ルートへ移動
    router.push("/");
    // モバイルなどの場合はサイドバーを閉じる
    if (onClick) onClick();
  };

  return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleNewChat}
            variant="secondary"
            className={cn(
              "relative group flex items-center justify-start overflow-hidden transition-all duration-300 border-none",
              "h-10 p-0",
              "bg-[#DDE3EA] hover:bg-[#D2D9E1] text-foreground",
              isExpanded ? "w-full rounded-full" : "w-10 rounded-full"
            )}
          >
            <div className="flex items-center justify-center shrink-0 h-10 w-10 text-muted-foreground group-hover:text-foreground">
              <SquarePen className="h-5 w-5" />
            </div>

            <span className={cn(
              "whitespace-nowrap transition-all duration-300 ease-in-out pr-4 font-medium",
              isExpanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"
            )}>
              チャットを新規作成
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white border-transparent" side="right" sideOffset={10}>
          <p>チャットを新規作成</p>
        </TooltipContent>
      </Tooltip>
  );
}
