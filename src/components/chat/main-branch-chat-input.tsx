"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type MainBranchChatInputProps = {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
};

export function MainBranchChatInput({ onSend, disabled = false }: MainBranchChatInputProps) {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const send = async () => {
    const message = input.trim();
    if (!message || disabled || isSending) return;

    setIsSending(true);
    try {
      await onSend(message);
      setInput("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="rounded-xl border bg-background p-4">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="メインブランチで会話する..."
        className="min-h-[72px] resize-none border-none bg-transparent shadow-none focus-visible:ring-0"
        rows={2}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void send();
          }
        }}
      />

      <div className="mt-3 flex justify-end">
        <Button
          type="button"
          size="icon"
          onClick={() => void send()}
          className="rounded-full"
          disabled={!input.trim() || disabled || isSending}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
