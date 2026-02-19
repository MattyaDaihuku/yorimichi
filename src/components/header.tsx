"use client";

import { useState } from "react";
import { Menu, User } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar/sidebar-content";

interface HeaderProps {
  title?: string;
  className?: string; // 背景色などを指定するためのProps
}

export function Header({ title = "", className }: HeaderProps) {
  const { user } = useUser();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className={cn(
      "sticky top-0 z-20 px-6 pt-[env(safe-area-inset-top)] min-h-[calc(4rem+env(safe-area-inset-top))] transition-colors duration-300", 
      className || "bg-background" // 指定がなければデフォルト背景色
    )}>
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden absolute left-4 top-[calc(env(safe-area-inset-top)+2rem)] -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85vw] max-w-[280px] p-0 border-none bg-[#E9EEF6] md:hidden">
          <SheetTitle className="sr-only">メニュー</SheetTitle>
          <SidebarContent
            isCollapsed={false}
            toggleSidebar={() => setIsMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="grid grid-cols-3 items-center h-16 w-full">
        {/* 左側: サービス名 */}
        <div className="flex items-center justify-start gap-2 pl-10 md:pl-0">
          <span className="text-xs md:text-sm font-bold tracking-tight text-foreground/60 uppercase leading-none">
            Git-Chat AI
          </span>
        </div>

        {/* 中央: 会話タイトル */}
        <div className="flex justify-center overflow-hidden px-4">
          <h1 className="text-base font-semibold text-foreground truncate max-w-full">
            {title}
          </h1>
        </div>

        {/* 右側: ユーザーアイコン */}
        <div className="flex justify-end">
          <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-muted flex items-center justify-center border border-border cursor-pointer hover:bg-muted/80 transition-colors">
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-full w-full rounded-full object-cover", // アイコン自体のスタイル
                    userButtonPopoverCard: "shadow-xl", // メニュー（ポップオーバー）の影
                  }
                }}
              />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}