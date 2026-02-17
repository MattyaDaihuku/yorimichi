"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // ButtonではなくLinkを使って遷移させるのがNext.jsの定石です
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Clock } from "lucide-react";
import { getAllChats, Chat } from "@/lib/api";

export function ChatHistory({ onClickItem }: { onClickItem?: () => void }) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    // コンポーネントマウント時に履歴を取得
    getAllChats().then(setChats);
  }, []);

  return (
    <ScrollArea className="flex-1 px-4 py-4">
      <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Recent Repositories
      </div>
      <div className="flex flex-col gap-1">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            onClick={onClickItem}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-accent group transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            <div className="flex flex-col items-start gap-1 overflow-hidden w-full">
              <span className="truncate w-full text-left text-sm font-medium">
                {chat.title}
              </span>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {chat.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}