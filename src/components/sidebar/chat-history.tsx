"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Clock } from "lucide-react";
import { ChatList } from "@/types/db"; // 型だけインポート

export function ChatHistory({ onClickItem }: { onClickItem?: () => void }) {
  const [chats, setChats] = useState<ChatList[]>([]);

  useEffect(() => {
    // APIルートから直接取得
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/chats");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  return (
    <ScrollArea className="flex-1 px-4 py-4">
      <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Conversation History
      </div>
      <div className="flex flex-col gap-1">
        {chats.map((chat) => (
          <Link
            key={chat.chat_id}
            href={`/chat/${chat.chat_id}`}
            onClick={onClickItem}
            className="flex items-center gap-3 py-3 px-3 rounded-md hover:bg-accent group transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            <div className="flex flex-col items-start gap-1 overflow-hidden w-full">
              <span className="truncate w-full text-left text-sm font-medium">
                {chat.chat_title}
              </span>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {/* 簡易的な日付表示 */}
                {new Date(chat.created_at).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}