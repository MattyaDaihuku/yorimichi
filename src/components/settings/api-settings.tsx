"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/settings/password-input";

export type ApiKeys = {
  openai: string;
  anthropic: string;
  google: string;
};

type ApiSettingsProps = {
  keys: ApiKeys;
  setKeys: React.Dispatch<React.SetStateAction<ApiKeys>>;
  loading: boolean;
  saving: boolean;
  onSave: () => Promise<void>;
};

export function ApiSettings({ keys, setKeys, loading, saving, onSave }: ApiSettingsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">APIキー</h3>
      <p className="text-sm text-muted-foreground">
        各AIプロバイダのAPIキーを登録・更新します。空にして保存するとキーを削除できます。
      </p>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="openai-key">OpenAI API キー</Label>
          <PasswordInput
            id="openai-key"
            placeholder="sk-..."
            value={keys.openai}
            onChange={(e) => setKeys((prev) => ({ ...prev, openai: e.target.value }))}
            className="font-mono bg-background"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="anthropic-key">Anthropic API キー</Label>
          <PasswordInput
            id="anthropic-key"
            placeholder="sk-ant-..."
            value={keys.anthropic}
            onChange={(e) => setKeys((prev) => ({ ...prev, anthropic: e.target.value }))}
            className="font-mono bg-background"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="gemini-key">Gemini API キー</Label>
          <PasswordInput
            id="gemini-key"
            placeholder="AIza..."
            value={keys.google}
            onChange={(e) => setKeys((prev) => ({ ...prev, google: e.target.value }))}
            className="font-mono bg-background"
          />
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
