export type ChatHistoryItem = {
    role: "user" | "assistant" | "system";
    content: string;
};

export type StreamingBlock = {
    block_id: string;
    user_content: string;
    ai_content: string;
    created_at: string;
};

type SendMessageParams = {
    chatId: string;
    branchId: string;
    message: string;
    history: ChatHistoryItem[];
    reload: () => Promise<void>;
    setStreamingBlock: (value: StreamingBlock | null | ((prev: StreamingBlock | null) => StreamingBlock | null)) => void;
};

export async function sendMessageWithStreaming({
    chatId,
    branchId,
    message,
    history,
    reload,
    setStreamingBlock,
}: SendMessageParams): Promise<void> {
    const blockId = crypto.randomUUID();

    setStreamingBlock({
        block_id: "streaming-block",
        user_content: message,
        ai_content: "",
        created_at: new Date().toISOString(),
    });

    try {
        const res = await fetch("/api/internal/message/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                branch_id: branchId,
                block_id: blockId,
                message,
                history,
            }),
        });

        if (!res.ok) {
            const payload = await res
                .json()
                .catch(() => ({ error: "メッセージ送信に失敗しました。" }));

            const status = res.status;
            const messageText =
                typeof payload?.error === "string"
                    ? payload.error
                    : "メッセージ送信に失敗しました。";

            throw new Error(`[${status}] ${messageText}`);
        }

        if (!res.body) {
            throw new Error("[500] AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let aiContent = "";
        let markerStatus: number | null = null;

        const markerRegex = /\[\[ERROR:(\d+)\]\]/g;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            let sanitizedChunk = chunk;
            let match: RegExpExecArray | null;

            while ((match = markerRegex.exec(chunk)) !== null) {
                markerStatus = Number(match[1]);
            }

            sanitizedChunk = sanitizedChunk.replace(markerRegex, "");

            aiContent += sanitizedChunk;
            setStreamingBlock((prev) =>
                prev
                    ? {
                        ...prev,
                        ai_content: aiContent,
                    }
                    : prev
            );
        }

        if (markerStatus) {
            const markerMessage =
                markerStatus === 429
                    ? "利用が集中しています。しばらく時間をおいて再度お試しください。"
                    : "AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。";
            throw new Error(`[${markerStatus}] ${markerMessage}`);
        }

        if (aiContent.trim().length === 0) {
            throw new Error("[500] AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。");
        }

        await reload();
        setStreamingBlock(null);
    } catch (error) {
        setStreamingBlock(null);
        try {
            await fetch("/api/internal/message/revert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ block_id: blockId }),
            });
        } catch (revertError) {
            console.error("[MessageRevertFailed]", revertError);
        }

        if (error instanceof Error && /^\[\d+\]\s*/.test(error.message)) {
            throw error;
        }

        const messageText =
            error instanceof Error && error.message
                ? error.message
                : "AI応答の取得に失敗しました。しばらく時間をおいて再度お試しください。";

        throw new Error(`[500] ${messageText}`);
    }
}
