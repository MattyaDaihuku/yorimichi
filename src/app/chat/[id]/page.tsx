"use client";

import { useEffect, use, useState } from "react";
import { useHeader } from "@/context/header-context";
import { getChatById } from "@/lib/api"; // 作成したAPIをインポート

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  // 1. まず params をアンラップする
  const { id } = use(params);
  const { setTitle } = useHeader();
  
  // 状態管理（将来的にDBから取得したデータを保持するため）
  const [chatData, setChatData] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    // 2. 非同期でデータを取得する関数を定義
    const fetchChat = async () => {
      const data = await getChatById(id);
      setChatData(data);
      setTitle(data.title);
    };

    fetchChat();

    // アンマウント時にヘッダーをリセット
    return () => setTitle("");
  }, [id, setTitle]); // 依存配列は常に [id, setTitle] で固定されるためエラーが出ません

  // 読み込み中の表示（必要であれば）
  if (!chatData) return <div className="p-8 text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 以前のモック表示 */}
      <div className="p-6 border rounded-xl bg-muted/20 shadow-sm">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Current Context
        </h2>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{chatData.title}</p>
          <p className="text-xs font-mono text-muted-foreground">ID: {chatData.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ここに将来的なブランチ作成UIなどが来る */}
        <div className="p-4 border border-dashed rounded-lg flex items-center justify-center text-sm text-muted-foreground">
          会話のメッセージ履歴がここに表示されます
        </div>
      </div>
    </div>
  );
}