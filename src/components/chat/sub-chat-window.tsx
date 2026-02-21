import { useEffect, useMemo, useRef, useState } from "react";
import { ChatComposer } from "@/components/chat/chat-composer";
import { useChatStore } from "@/store/chat-store";
import { MessageBlock } from "@/components/chat/message-block";

interface SubChatWindowProps {
  branchId: string;
}

export function SubChatWindow({ branchId }: SubChatWindowProps) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const blockListRef = useRef<HTMLDivElement | null>(null);

  const chatData = useChatStore((state) => state.chatData);
  const blocks = chatData?.blocks ?? {};

  // 対象のブランチ自身のブロックを取得し、時系列でソート
  const ownBlocks = Object.values(blocks)
    .filter((block) => block.branch_id === branchId)
    .sort(
      (first, second) =>
        new Date(first.created_at).getTime() - new Date(second.created_at).getTime()
    );

  // 対象ブランチの親ブロック（分岐元のブロック）を取得
  const targetBranch = chatData?.branches?.[branchId];
  const parentBlock =
    targetBranch?.parent_block_id && targetBranch.depth > 0
      ? (blocks[targetBranch.parent_block_id] ?? null)
      : null;

  // 親ブロック（あれば）＋自身のブロックのリスト
  const displayBlocks = parentBlock
    ? [parentBlock, ...ownBlocks.filter((b) => b.block_id !== parentBlock.block_id)]
    : ownBlocks;

  const branchBlockCount = displayBlocks.length;

  // 新しいメッセージが追加されたら一番下へスクロール
  useEffect(() => {
    const container = blockListRef.current;
    if (!container) return;

    const blockElements = container.querySelectorAll<HTMLElement>("[data-message-block='true']");
    const latestBlock = blockElements[blockElements.length - 1];
    latestBlock?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [branchBlockCount]);

  // デモ用のダミー送信処理
  const send = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    setIsSending(true);
    try {
      // 疑似的なネットワーク遅延
      await new Promise((resolve) => setTimeout(resolve, 500));
      setInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* メッセージリスト領域 */}
      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        <div ref={blockListRef} className="space-y-4 pb-8">
          {displayBlocks.length === 0 ? (
            <div className="rounded-lg border bg-muted/20 p-6 text-sm text-muted-foreground mt-4 mx-auto max-w-3xl">
              このヨリミチにはまだ会話がありません。
            </div>
          ) : (
            displayBlocks.map((block, index) => {
              const isLastBlock = index === displayBlocks.length - 1;
              const connector = {
                // サブブランチでは分岐や統合をシンプルに見せるための設定
                style: "straight",
                type: isLastBlock ? "split" : "continue",
              } as const;

              return (
                <MessageBlock
                  key={block.block_id}
                  block={block}
                  connector={connector}
                />
              );
            })
          )}
        </div>
      </div>

      {/* チャット入力領域 */}
      <div className="relative bg-background p-4 z-10 shrink-0">
        <div className="pointer-events-none absolute -top-8 left-0 right-0 z-0 h-8 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <ChatComposer
            value={input}
            onChange={setInput}
            onSubmit={send}
            placeholder="会話してみましょう"
            isSending={isSending}
            alwaysBorder={true}
          />
        </div>
      </div>
    </div>
  );
}
