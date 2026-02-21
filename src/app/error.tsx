"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { useChatStore } from "@/store/chat-store";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 開発環境やログ収集サービスにエラーを報告
        console.error("[AppError]", error);
    }, [error]);

    return (
        <div className="flex flex-col h-screen w-full bg-background">
            <Header title="500 - Server Error" className="bg-background" />

            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-destructive/10 blur-3xl rounded-full scale-150" />
                    <div className="relative bg-background border border-destructive/20 rounded-2xl p-6 shadow-2xl">
                        <AlertTriangle className="h-12 w-12 text-destructive" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                    予期せぬエラーが発生しました
                </h2>
                <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
                    処理中に問題が発生しました。<br />
                    一時的な問題の可能性がありますので、再試行をお試しください。
                </p>

                {error.digest && (
                    <div className="mb-8 p-3 bg-muted rounded-lg border border-border">
                        <p className="text-[10px] font-mono text-muted-foreground break-all">
                            Error Digest: {error.digest}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={() => reset()}
                        variant="outline"
                        size="lg"
                        className="rounded-xl px-8 flex items-center gap-2 border-border"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        再試行する
                    </Button>
                    <Button
                        onClick={() => {
                            useChatStore.getState().clearChat();
                            window.location.href = "/";
                        }}
                        variant="default"
                        size="lg"
                        className="rounded-xl px-8 flex items-center gap-2"
                    >
                        <Home className="h-4 w-4" />
                        ホームに戻る
                    </Button>
                </div>
            </main>
        </div>
    );
}
