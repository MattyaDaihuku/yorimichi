"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Minus } from "lucide-react";

type CustomInstructionsSettingsProps = {
  systemPrompt: string;
  setSystemPrompt: React.Dispatch<React.SetStateAction<string>>;
  systemPromptEnabled: boolean;
  setSystemPromptEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  saving: boolean;
  onSave: () => Promise<void>;
};

export function CustomInstructionsSettings({
  systemPrompt,
  setSystemPrompt,
  systemPromptEnabled,
  setSystemPromptEnabled,
  loading,
  saving,
  onSave,
}: CustomInstructionsSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">カスタム指示</h3>
      <p className="text-sm text-muted-foreground">
        送信時に先頭の system メッセージとして自動で付与されます。
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-end gap-2">
          <span className="text-sm">カスタム指示を有効化</span>
          <button
            type="button"
            role="switch"
            aria-checked={systemPromptEnabled}
            aria-label="カスタム指示の有効化"
            onClick={() => setSystemPromptEnabled((prev) => !prev)}
            className={[
              "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              systemPromptEnabled ? "justify-end border-blue-600 bg-blue-600" : "justify-start border-zinc-500 bg-zinc-100",
            ].join(" ")}
          >
            <span
              className={[
                "mx-1 inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200",
                systemPromptEnabled ? "bg-white text-blue-600" : "bg-zinc-500 text-white",
              ].join(" ")}
            >
              {systemPromptEnabled ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
            </span>
          </button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="system-prompt">カスタム指示文</Label>
          <Textarea
            id="system-prompt"
            placeholder="例: あなたは日本語で簡潔に回答し、手順を箇条書きで示してください。"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="min-h-20 bg-background"
            maxLength={4000}
          />
          <p className="text-xs text-muted-foreground text-right">{systemPrompt.length} / 4000</p>
        </div>
      </div>

      <div className="pt-6 border-t mt-6 flex justify-start">
        <Button onClick={onSave} disabled={loading || saving}>
          {saving ? "保存中..." : "保存"}
        </Button>
      </div>
    </div>
  );
}
