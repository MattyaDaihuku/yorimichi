"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Pin } from "lucide-react";
import { Chatlist } from "@/generated/prisma"; // 型だけインポート
import { cn } from "@/lib/utils";

type SerializedChatlist = Omit<Chatlist, "created_at" | "update_at"> & {
  created_at: string;
  update_at: string;
};

const fetcher = async (
  url: string
): Promise<SerializedChatlist[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function ChatHistory({ onClickItem }: { onClickItem?: () => void }) {
  const pathname = usePathname();
  const { data: chats = [], mutate } = useSWR("/api/internal/chat/list", fetcher);

  const togglePin = async (chatId: string, isPinned: boolean) => {
    try {
      const res = await fetch(`/api/internal/chat/${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_pinned: isPinned }),
      });

      if (!res.ok) throw new Error("Failed to update pin status");
      await mutate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollArea className="flex-1 w-full min-w-0 box-border px-4 py-4 overflow-hidden">
      <div className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Conversation History
      </div>
      <div className="flex w-full min-w-0 flex-col gap-1">
        {chats.map((chat) => (
          <div
            key={chat.chat_id}
            className={cn(
              "grid w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto] items-center rounded-md hover:bg-accent group transition-colors",
              pathname === `/chat/${chat.chat_id}` && "bg-accent"
            )}
          >
            <Link
              href={`/chat/${chat.chat_id}`}
              onClick={onClickItem}
              className="flex min-w-0 max-w-full items-center py-3 pl-3 pr-1 overflow-hidden"
            >
              <div className="flex min-w-0 max-w-full flex-col items-start gap-1 overflow-hidden w-full pr-2">
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
            <button
              type="button"
              aria-label={chat.is_pinned ? "Unpin chat" : "Pin chat"}
              className={cn(
                "mr-2 shrink-0 rounded p-1 text-muted-foreground hover:text-primary",
                chat.is_pinned
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void togglePin(chat.chat_id, !chat.is_pinned);
              }}
            >
              <Pin
                className={cn(
                  "h-4 w-4",
                  chat.is_pinned
                    ? "text-primary fill-current"
                    : "group-hover:text-foreground"
                )}
              />
            </button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
