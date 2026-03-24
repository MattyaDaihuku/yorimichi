"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
      onOpenChange(false); // Close dialog on success
    } catch (err) {
      toast.error("APIキーの保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] md:max-w-4xl max-h-[90vh] overflow-y-auto sm:max-w-4xl p-0">
        <div className="flex-1 space-y-4 p-8 pt-6 w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold tracking-tight">API キー</DialogTitle>
            <DialogDescription className="mt-2 text-base">
              各AIサービスを利用するためのAPI キーを入力してください。
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-6" />

          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/4">
              <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                <Button variant="secondary" className="justify-start">
                  API キー
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
