"use client";

import { use } from "react";
import { Header } from "@/components/header";
import { BranchTree } from "@/components/branch_view/parent_track";

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { id } = use(params);

  return (
    // <>
    //   {/* 会話タイトルと白背景を指定 */}
    //   <Header title={id} className="bg-background" />

    //   <p>a</p>
    // </>

    <div className="flex flex-col h-screen w-full bg-gray-50/50">
      {/* 会話タイトルと白背景を指定 */}
      <Header title={id} className="bg-background shrink-0" />

      {/* ツリーUIを表示するメインエリア */}
      <main className="flex-1 overflow-auto">
        <BranchTree chatId={id} />
      </main>
    </div>
  );
}