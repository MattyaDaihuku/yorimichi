"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function GeneralSettings() {
  const { theme, setTheme } = useTheme();

  return (
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
  );
}
