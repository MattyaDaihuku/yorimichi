"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">パーソナライズ設定</h2>
          <p className="text-muted-foreground">
            アプリケーションの動作やAIモデルの振る舞いをカスタマイズするためのAPIキーを設定します。
          </p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Button variant="secondary" className="justify-start">
              API プロバイダー
            </Button>
            <Button variant="ghost" className="justify-start">
              一般設定
            </Button>
          </nav>
        </aside>

        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">プロバイダー API キー</h3>
              <p className="text-sm text-muted-foreground">
                各AIサービスを利用するためのAPIキーを入力してください。
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  className="font-mono bg-background"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  GPT-4 などの OpenAI モデルを利用する際に必要です。
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                  className="font-mono bg-background"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Claude 3 などの Anthropic モデルを利用する際に必要です。
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gemini-key">Google Gemini API Key</Label>
                <Input
                  id="gemini-key"
                  type="password"
                  placeholder="AIza..."
                  className="font-mono bg-background"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Gemini Pro などの Google モデルを利用する際に必要です。
                </p>
              </div>
            </div>

            <div className="pt-6 border-t mt-6 flex justify-start">
              <Button>一括保存</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
