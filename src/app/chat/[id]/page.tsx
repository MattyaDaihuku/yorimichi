"use client";

import { useEffect, use, useState } from "react";
import { ChatDetailResponse } from "@/types/db";
import { Header } from "@/components/header"; // Headerをインポート

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);
  const [chatData, setChatData] = useState<ChatDetailResponse | null>(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/chats/${id}`);
        if (!res.ok) return;
        const data = await res.json();
        setChatData(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchChat();
  }, [id]);

  if (!chatData) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <>
      {/* 会話タイトルと白背景を指定 */}
      <Header title={chatData.chat_title} className="bg-background" />

      <main className="flex-1 bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
          <div className="p-6 border rounded-xl bg-muted/20 shadow-sm">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Current Context (ID: {chatData.chat_id})
            </h2>
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold">{chatData.chat_title}</p>
              
              <div className="mt-4">
                 <p className="font-semibold">Branches:</p>
                 <ul className="list-disc list-inside text-sm">
                   {chatData.branches.map(b => (
                     <li key={b.branch_id}>{b.branch_title} ({b.status})</li>
                   ))}
                 </ul>
              </div>

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
      </main>
    </>
  );
}