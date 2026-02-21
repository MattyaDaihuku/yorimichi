"use client";

import { MoveLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { useChatStore } from "@/store/chat-store";

export default function NotFound() {
    return (
        <div className="flex flex-col h-screen w-full bg-background">
            <Header title="404 - Not Found" className="bg-background" />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150" />
                    <div className="relative bg-background border border-border rounded-2xl p-6 shadow-2xl">
                        <Search className="h-12 w-12 text-blue-500 animate-pulse" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                    ページが見つかりませんでした
                </h2>
                <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
                    お探しのページは削除されたか、URLが正しくない可能性があります。<br />
                    ホームに戻ってやり直してください。
                </p>

                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            useChatStore.getState().clearChat();
                            window.location.href = "/";
                        }}
                        variant="default"
                        size="lg"
                        className="rounded-xl px-8 flex items-center gap-2"
                    >
                        <MoveLeft className="h-4 w-4" />
                        ホームに戻る
                    </Button>
                </div>
            </main>
        </div>
    );
}
