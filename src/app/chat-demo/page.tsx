"use client";

import { use } from "react";
import { Header } from "@/components/header"; // Headerをインポート
import { ChatUIContainer } from "@/components/chat/chat-ui-container";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatDemoPage({ params }: ChatPageProps) {
  const { id } = use(params);

  return (
    <>
      {/* 会話タイトルと白背景を指定 */}
      <Header title="Chat UI Demo" className="bg-background" />

      <main className="flex h-[calc(100vh-4rem)] bg-background p-4">
        <ChatUIContainer />
      </main>
    </>
  );
}
