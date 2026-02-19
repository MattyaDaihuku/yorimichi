"use client";

import { useState } from "react";
import { Sparkles, Image as ImageIcon, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header"; // Headerをインポート

export default function Home() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("New chat with:", input);
    setInput("");
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
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">User</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-[#c4c7c5] tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
              何から始めますか？
            </h1>
          </div>

          {/* 入力エリア */}
          <div className="relative w-full group animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            <div className="bg-white rounded-[28px] shadow-sm border border-transparent focus-within:shadow-md focus-within:border-gray-200 transition-all p-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="質問を入力するか、Gitブランチを作成..."
                className="w-full resize-none border-none outline-none text-lg bg-transparent min-h-[56px] max-h-[200px] placeholder:text-gray-400 focus-visible:ring-0 shadow-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:bg-gray-100">
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSend}
                  size="icon" 
                  className={`rounded-full transition-all ${input.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-100 cursor-default'}`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* サジェストチップ */}
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            {["画像を生成", "コードのデバッグ", "ブランチ戦略の相談", "JPHACKSのアイデア"].map((suggestion) => (
              <button
                key={suggestion}
                className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-left"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}