"use client";

import { useHeader } from "@/context/header-context";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { title, headerBg } = useHeader();

  return (
    <header className={cn(
      "h-16 sticky top-0 z-20 px-6 transition-colors duration-300", 
      headerBg // 動的な背景色
    )}>
      <div className="grid grid-cols-3 items-center h-full w-full">
        <div className="flex justify-start">
          <span className="text-sm font-bold tracking-tight text-foreground/60 uppercase">
            Git-Chat AI
          </span>
        </div>

        <div className="flex justify-center overflow-hidden px-4">
          <h1 className="text-base font-semibold text-foreground truncate max-w-full">
            {title}
          </h1>
        </div>

        <div className="flex justify-end">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center border border-border cursor-pointer hover:bg-muted/80 transition-colors">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}