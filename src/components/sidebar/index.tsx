"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* デスクトップ用 */}
      {!isCollapsed && (
        <div 
          className="hidden md:block fixed inset-0 z-30 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "hidden md:flex flex-col h-full fixed top-0 left-0 z-40 transition-all duration-200 ease-out shadow-xl border-none",
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