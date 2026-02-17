"use client";

import { useEffect, use, useState } from "react";
import { useHeader } from "@/context/header-context";
import { ChatDetailResponse } from "@/types/db"; // 型インポート

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const { setTitle, setHeaderBg } = useHeader();
  const [chatData, setChatData] = useState<ChatDetailResponse | null>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        // IDを使ってAPIルートを叩く
        const res = await fetch(`/api/chats/${id}`);
        
        if (!res.ok) {
           if (res.status === 404) {
             console.error("Chat not found");
             return;
           }
           throw new Error("Failed to fetch");
        }

        const data: ChatDetailResponse = await res.json();
        setChatData(data);
        setTitle(data.chat_title);
        setHeaderBg("bg-background");
      } catch (e) {
        console.error(e);
      }
    };

    fetchChat();

    return () => {
      setTitle("");
      setHeaderBg("bg-background");
    };
  }, [id, setTitle, setHeaderBg]);

  if (!chatData) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 border rounded-xl bg-muted/20 shadow-sm">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Current Context (ID: {chatData.chat_id})
        </h2>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{chatData.chat_title}</p>
          
          {/* ブランチ情報の表示 */}
          <div className="mt-4">
             <p className="font-semibold">Branches:</p>
             <ul className="list-disc list-inside text-sm">
               {chatData.branches.map(b => (
                 <li key={b.branch_id}>{b.branch_title} ({b.status})</li>
               ))}
             </ul>
          </div>

          {/* メッセージ（ブロック）の表示 */}
          <div className="mt-4">
             <p className="font-semibold">Messages:</p>
             {chatData.blocks.map(blk => (
                <div key={blk.block_id} className="mt-2 p-2 bg-white rounded border">
                    <p className="font-bold text-xs text-primary">User</p>
                    <p className="text-sm mb-2">{blk.user_content}</p>
                    <p className="font-bold text-xs text-green-600">AI</p>
                    <p className="text-sm">{blk.ai_content}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
}