"use client";

import { use } from "react";
import { Header } from "@/components/header"; // Headerをインポート

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);

  return (
    <>
      {/* 会話タイトルと白背景を指定 */}
      <Header title={id} className="bg-background" />

      <p>a</p>
    </>
  );
}