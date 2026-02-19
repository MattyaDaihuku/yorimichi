"use client";

// 1. useEffect を追加インポート
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // 2. マウント状態を管理するステートを追加
  const [mounted, setMounted] = useState(false);

  // 3. ブラウザに読み込まれたら true にする
  useEffect(() => {
    setMounted(true);
  }, []);

  // 4. マウントされるまでは何も表示しない（ミスマッチを防ぐ）
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* モバイル用 */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 border-none bg-[#E9EEF6]">
            <SheetTitle className="sr-only">メニュー</SheetTitle>
            <SidebarContent 
              isCollapsed={false} 
              toggleSidebar={() => setIsMobileOpen(false)} 
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* デスクトップ用 */}
      {!isCollapsed && (
        <div 
          className="hidden md:block fixed inset-0 z-30 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "hidden md:flex flex-col h-full fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out shadow-xl border-none",
          "bg-[#E9EEF6]",
          isCollapsed ? "w-[72px] shadow-none" : "w-[280px]"
        )}
      >
        <SidebarContent 
          isCollapsed={isCollapsed} 
          toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
        />
      </aside>
    </>
  );
}