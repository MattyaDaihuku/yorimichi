"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header"; // Headerをインポート
import { useUser } from "@clerk/nextjs";
import { mutate } from "swr";
import { ChatComposer } from "@/components/chat/chat-composer";
import { useChatStore } from "@/store/chat-store";

export default function Home() {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const setCurrentIds = useChatStore((state) => state.setCurrentIds);

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    const chatId = crypto.randomUUID();
    const branchId = crypto.randomUUID();
    const blockId = crypto.randomUUID();

    setCurrentIds({ chatId, branchId, blockId });

    setIsSending(true);

    try {
      const res = await fetch("/api/internal/chat/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          branch_id: branchId,
          block_id: blockId,
          message,
        }),
      });

      if (!res.ok) throw new Error("Failed to create chat");

      setInput("");
      await mutate("/api/internal/chat/list");
      router.push(`/chat/${chatId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header className="bg-[#F0F4F8]" />

      <main className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[#F0F4F8] text-[#1F1F1F]">
        <div className="w-full max-w-3xl px-4 flex flex-col gap-8">

          {/* 挨拶エリア */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-4xl md:text-5xl font-medium tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent w-fit animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="text-[#c4c7c5]">こんにちは,</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{user?.fullName || "User"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-[#c4c7c5] tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              何から始めますか？
            </h1>
          </div>

          {/* 入力エリア */}
          <div className="relative w-full group animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <ChatComposer
              value={input}
              onChange={setInput}
              onSubmit={handleSend}
              isSending={isSending}
            />
          </div>

          {/* サジェストチップ */}
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            {["一日を盛り上げる", "知識をサクッと吸収", "やる気を引き出す", "アイデアの壁打ち"].map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="ghost"
                className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
