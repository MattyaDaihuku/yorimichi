"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Moon, Sun, Monitor } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function PasswordInput({ id, placeholder, className, value, onChange }: { id: string; placeholder?: string; className?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [keys, setKeys] = useState<{ openai: string, anthropic: string, google: string }>({ openai: "", anthropic: "", google: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"api" | "general" | "custom">("general");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch("/api/user/apikeys")
        .then((res) => res.json())
        .then((data) => {
          if (data.keys) {
            setKeys({
              openai: data.keys.openai || "",
              anthropic: data.keys.anthropic || "",
              google: data.keys.google || "",
            });
          }
        })
        .catch((err) => console.error("Failed to load keys", err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/apikeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keys),
      });
      if (!res.ok) throw new Error("Failed to save keys");
      toast.success("APIキーを保存しました。");
    } catch (err) {
      toast.error("APIキーの保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-4xl min-h-[500px] md:min-h-[600px] max-h-[90vh] overflow-y-auto sm:max-w-4xl p-0">
        <div className="flex-1 space-y-4 p-8 pt-6 w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold tracking-tight">設定</DialogTitle>
            <DialogDescription className="mt-2 text-base">
              アプリケーション全体の設定や、各AIサービスを利用するためのAPIキーを管理します。
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-6" />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/4">
              <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                <Button 
                  variant={activeTab === "general" ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => setActiveTab("general")}
                >
                  一般設定
                </Button>
                <Button 
                  variant={activeTab === "api" ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => setActiveTab("api")}
                >
                  API キー
                </Button>
                <Button 
                  variant={activeTab === "custom" ? "secondary" : "ghost"} 
                  className="justify-start"
                  onClick={() => setActiveTab("custom")}
                >
                  カスタム指示
                </Button>
              </nav>
            </aside>

            <div className="flex-1 lg:max-w-2xl">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium">外観</h3>
                    <p className="text-sm text-muted-foreground">
                      アプリのテーマ（ライト・ダークモード）を選択します。
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        onClick={() => setTheme("light")}
                        className="flex items-center gap-2"
                      >
                        <Sun className="h-4 w-4" />
                        ライト
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        onClick={() => setTheme("dark")}
                        className="flex items-center gap-2"
                      >
                        <Moon className="h-4 w-4" />
                        ダーク
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        onClick={() => setTheme("system")}
                        className="flex items-center gap-2"
                      >
                        <Monitor className="h-4 w-4" />
                        システム設定に従う
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="openai-key">OpenAI API キー</Label>
                      <PasswordInput
                        id="openai-key"
                        placeholder="sk-..."
                        value={keys.openai}
                        onChange={(e) => setKeys(prev => ({ ...prev, openai: e.target.value }))}
                        className="font-mono bg-background"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="anthropic-key">Anthropic API キー</Label>
                      <PasswordInput
                        id="anthropic-key"
                        placeholder="sk-ant-..."
                        value={keys.anthropic}
                        onChange={(e) => setKeys(prev => ({ ...prev, anthropic: e.target.value }))}
                        className="font-mono bg-background"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gemini-key">Gemini API キー</Label>
                      <PasswordInput
                        id="gemini-key"
                        placeholder="AIza..."
                        value={keys.google}
                        onChange={(e) => setKeys(prev => ({ ...prev, google: e.target.value }))}
                        className="font-mono bg-background"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t mt-6 flex justify-start">
                    <Button onClick={handleSave} disabled={loading || saving}>
                      {saving ? "保存中..." : "一括保存"}
                    </Button>
                  </div>
                </div>
              )}
              {activeTab === "custom" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium">カスタム指示</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
