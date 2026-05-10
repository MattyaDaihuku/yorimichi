"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSettingsDialogStore } from "@/store/settings-dialog-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GeneralSettings } from "@/components/settings/general-settings";
import { ApiSettings, type ApiKeys } from "@/components/settings/api-settings";
import { CustomInstructionsSettings } from "@/components/settings/custom-instructions-settings";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [keys, setKeys] = useState<ApiKeys>({ openai: "", anthropic: "", google: "" });
  const [initialKeys, setInitialKeys] = useState<ApiKeys>({ openai: "", anthropic: "", google: "" });
  const [systemPrompt, setSystemPrompt] = useState("");
  const [initialSystemPrompt, setInitialSystemPrompt] = useState("");
  const [systemPromptEnabled, setSystemPromptEnabled] = useState(false);
  const [initialSystemPromptEnabled, setInitialSystemPromptEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingApiKeys, setSavingApiKeys] = useState(false);
  const [savingSystemPrompt, setSavingSystemPrompt] = useState(false);
  const settingsStore = useSettingsDialogStore();
  const [activeTab, setActiveTab] = useState<"api" | "general" | "custom">("general");
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveTab(settingsStore.activeTab);
      setLoading(true);
      Promise.all([
        fetch("/api/user/apikeys").then((res) => res.json()),
        fetch("/api/user/system-prompt").then((res) => res.json()),
      ])
        .then(([apiKeysData, systemPromptData]) => {
          const loadedKeys: ApiKeys = {
            openai: apiKeysData.keys?.openai || "",
            anthropic: apiKeysData.keys?.anthropic || "",
            google: apiKeysData.keys?.google || "",
          };

          const loadedSystemPrompt = systemPromptData.systemPrompt || "";
          const loadedSystemPromptEnabled = Boolean(systemPromptData.enabled);

          if (apiKeysData.keys) {
            setKeys(loadedKeys);
            setInitialKeys(loadedKeys);
          } else {
            setKeys(loadedKeys);
            setInitialKeys(loadedKeys);
          }

          setSystemPrompt(loadedSystemPrompt);
          setInitialSystemPrompt(loadedSystemPrompt);
          setSystemPromptEnabled(loadedSystemPromptEnabled);
          setInitialSystemPromptEnabled(loadedSystemPromptEnabled);
        })
        .catch((err) => console.error("Failed to load settings", err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleSaveApiKeys = async () => {
    setSavingApiKeys(true);
    try {
      const res = await fetch("/api/user/apikeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(keys),
      });
      if (!res.ok) throw new Error("Failed to save keys");
      setInitialKeys(keys);
      toast.success("APIキーを保存しました。");
    } catch {
      toast.error("APIキーの保存に失敗しました。");
    } finally {
      setSavingApiKeys(false);
    }
  };

  const handleSaveSystemPrompt = async () => {
    setSavingSystemPrompt(true);
    try {
      const res = await fetch("/api/user/system-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          enabled: systemPromptEnabled,
        }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          toast.error("カスタム指示は4000文字以内で入力してください。");
          return;
        }
        throw new Error("Failed to save system prompt");
      }

      const payload = await res.json().catch(() => null) as
        | { systemPrompt?: string; enabled?: boolean }
        | null;

      const savedPrompt = payload?.systemPrompt ?? systemPrompt;
      const savedEnabled = payload?.enabled ?? systemPromptEnabled;

      setSystemPrompt(savedPrompt);
      setInitialSystemPrompt(savedPrompt);
      setSystemPromptEnabled(savedEnabled);
      setInitialSystemPromptEnabled(savedEnabled);

      toast.success("カスタム指示を保存しました。");
    } catch {
      toast.error("カスタム指示の保存に失敗しました。");
    } finally {
      setSavingSystemPrompt(false);
    }
  };

  const hasApiKeyChanges =
    keys.openai !== initialKeys.openai ||
    keys.anthropic !== initialKeys.anthropic ||
    keys.google !== initialKeys.google;

  const hasSystemPromptChanges =
    systemPrompt !== initialSystemPrompt ||
    systemPromptEnabled !== initialSystemPromptEnabled;

  const hasUnsavedChanges = hasApiKeyChanges || hasSystemPromptChanges;

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && hasUnsavedChanges && !savingApiKeys && !savingSystemPrompt) {
      setShowCloseConfirm(true);
      return;
    }
    onOpenChange(nextOpen);
  };

  const confirmCloseWithoutSaving = () => {
    setShowCloseConfirm(false);
    onOpenChange(false);
  };

  return (
    <>
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="w-[calc(100dvw-2.5rem)] sm:w-[36rem] md:w-[44rem] lg:w-[60rem] xl:w-[72rem] 2xl:w-[84rem] max-w-none sm:max-w-none h-[calc(100dvh-2.5rem)] sm:h-[36rem] md:h-[40rem] lg:h-[44rem] sm:max-h-[calc(100dvh-2rem)] p-0 overflow-hidden">
        <div className="h-full flex flex-col px-4 sm:px-8 pt-4 sm:pt-6 pb-4 sm:pb-6 w-full overflow-hidden">
          <DialogHeader className="text-left">
            <DialogTitle className="text-3xl font-bold tracking-tight">設定</DialogTitle>
            <DialogDescription className="mt-2 text-base">
              アプリケーション全体の設定や、各AIサービスを利用するためのAPIキーを管理します。
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-6" />

          <div className="flex-1 min-h-0 flex flex-col gap-6 lg:flex-row lg:gap-10 overflow-hidden pr-2">
            <aside className="shrink-0 lg:w-1/4">
              <nav className="flex gap-2 lg:flex-col lg:gap-1">
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

            <div className="flex-1 min-h-0 overflow-y-auto pr-2 sm:pr-3 lg:pr-1">
              {activeTab === "general" && (
                <GeneralSettings />
              )}

              {activeTab === "api" && (
                <ApiSettings
                  keys={keys}
                  setKeys={setKeys}
                  loading={loading}
                  saving={savingApiKeys}
                  onSave={handleSaveApiKeys}
                  hasChanges={hasApiKeyChanges}
                />
              )}
              {activeTab === "custom" && (
                <CustomInstructionsSettings
                  systemPrompt={systemPrompt}
                  setSystemPrompt={setSystemPrompt}
                  systemPromptEnabled={systemPromptEnabled}
                  setSystemPromptEnabled={setSystemPromptEnabled}
                  loading={loading}
                  saving={savingSystemPrompt}
                  onSave={handleSaveSystemPrompt}
                  hasChanges={hasSystemPromptChanges}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <AlertDialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
      <AlertDialogContent className="min-w-0 w-[400px] sm:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>保存していない変更があります</AlertDialogTitle>
          <AlertDialogDescription>
            このまま閉じると、保存していない設定変更は破棄されます。設定画面を閉じますか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!flex-row justify-end gap-2">
          <AlertDialogCancel className="mt-0">キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={confirmCloseWithoutSaving}>閉じる</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
