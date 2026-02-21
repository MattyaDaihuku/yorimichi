"use client";

import { useState } from "react";
import { Menu, User } from "lucide-react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar/sidebar-content";

interface HeaderProps {
  title?: string;
  className?: string; // 背景色などを指定するためのProps
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function Header({ title = "", className }: HeaderProps) {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* ヘッダー固定 */}
      <div
        aria-hidden="true"
        className="h-[calc(4rem+env(safe-area-inset-top))] shrink-0"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-20 px-6 pt-[env(safe-area-inset-top)] h-[calc(4rem+env(safe-area-inset-top))] transition-colors duration-300",
          user && "md:left-[72px]",
          className || "bg-background"
        )}
      >
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
            <div className="h-9 w-9 md:h-9 md:w-9 rounded-full flex items-center justify-center cursor-pointer transition-colors">
              {!isLoaded ? (
                <Skeleton className="h-9 w-9 rounded-full skeleton-breathe" />
              ) : user ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonBox: "block !h-full !w-full",
                      userButtonTrigger: "!h-full !w-full rounded-full",
                      userButtonAvatarBox: "!no-shimmer !h-full !w-full rounded-full overflow-hidden",
                      userButtonAvatarImage: "!h-full !w-full object-cover",
                      userButtonPopoverCard: "shadow-xl",
                    }
                  }}
                />
              ) : (
                <Button
                  variant="outline"
                  className="px-4 h-9 rounded-full text-sm font-medium bg-white shadow-sm hover:bg-gray-100 border-gray-200 transition-colors duration-200"
                  onClick={() => openSignIn({
                    appearance: {
                      elements: {
                        modalBackdrop: {
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                        modalCloseButton: {
                          outline: "none",
                          boxShadow: "none",
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          }
                        }
                      }
                    }
                  })}
                >
                  ログイン
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}