"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

function PasswordInput({ id, placeholder, className }: { id: string; placeholder?: string; className?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={cn("pr-10", className)}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">APIキー設定</h2>
          <div className="text-muted-foreground mt-2">
            各AIサービスを利用するためのAPIキーを入力してください。
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            <Button variant="secondary" className="justify-start">
              APIキー設定
            </Button>
            <Button variant="ghost" className="justify-start">
              一般設定
            </Button>
          </nav>
        </aside>

        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="openai-key">OpenAI APIキー</Label>
                <PasswordInput
                  id="openai-key"
                  placeholder="sk-..."
                  className="font-mono bg-background"
                />
                <div className="text-[0.8rem] text-muted-foreground">
                  GPT-4 などの OpenAI モデルを利用する際に必要です。
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="anthropic-key">Anthropic APIキー</Label>
                <PasswordInput
                  id="anthropic-key"
                  placeholder="sk-ant-..."
                  className="font-mono bg-background"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Claude 3 などの Anthropic モデルを利用する際に必要です。
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gemini-key">Google Gemini APIキー</Label>
                <PasswordInput
                  id="gemini-key"
                  placeholder="AIza..."
                  className="font-mono bg-background"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Gemini などの Google モデルを利用する際に必要です。
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
