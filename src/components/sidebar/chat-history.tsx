"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
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
  const { user, isLoaded: isUserLoaded } = useUser();
  const { openSignIn } = useClerk();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const { cache } = useSWRConfig();
  const key = isUserLoaded && user ? "/api/internal/chat/list" : null;
  const hasCachedChats = key ? cache.get(key) !== undefined : false;

  const { data: chats = [], mutate } = useSWR(key, fetcher, {
    revalidateOnMount: !hasCachedChats && !!key,
    revalidateIfStale: false,
  });

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      void mutate();
    }
  }, [pathname, mutate]);

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
    <div className="relative h-full w-full min-w-0">
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-8 bg-gradient-to-b from-[#E9EEF6] to-transparent" />

      <div className="h-full w-full min-w-0 box-border overflow-y-auto overscroll-contain hide-scrollbar px-4 pt-6 pb-4">
        <div className="px-2 mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          チャット履歴
        </div>
        <div className="flex w-full min-w-0 flex-col gap-1">
          {user ? (
            chats.map((chat) => (
              <div
                key={chat.chat_id}
                className={cn(
                  "grid h-10 w-full min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto] items-center rounded-full hover:bg-[#DDE3EA] group transition-colors",
                  pathname === `/chat/${chat.chat_id}` && "bg-[#DDE3EA]"
                )}
              >
                <Link
                  href={`/chat/${chat.chat_id}`}
                  onClick={onClickItem}
                  className="flex h-10 min-w-0 max-w-full items-center pl-3 pr-1 overflow-hidden"
                >
                  <div className="flex min-w-0 max-w-full flex-col items-start overflow-hidden w-full pr-2">
                    <span className="truncate w-full text-left text-sm font-medium">
                      {chat.chat_title}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  aria-label={chat.is_pinned ? "Unpin chat" : "Pin chat"}
                  className={cn(
                    "mr-2 shrink-0 rounded p-1 text-muted-foreground hover:text-foreground",
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
                        : "group-hover:text-primary"
                    )}
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-4 bg-[#DDE3EA] rounded-2xl border border-gray-200/50 mx-2 mt-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                ログインすることでチャットの利用と<br />履歴の保存が可能になります</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-9 rounded-full text-xs bg-white border-gray-200 transition-colors"
                onClick={() => openSignIn({
                  appearance: {
                    elements: {
                      modalBackdrop: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                      },
                      modalCloseButton: {
                        outline: "none",
                        boxShadow: "none",
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        }
                      }
                    }
                  }
                })}
              >
                ログイン
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
