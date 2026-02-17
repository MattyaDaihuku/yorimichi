"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type HeaderContextType = {
  title: string;
  setTitle: (title: string) => void;
  headerBg: string; // 背景色用のクラス
  setHeaderBg: (bg: string) => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [headerBg, setHeaderBg] = useState("bg-background"); // デフォルト

  return (
    <HeaderContext.Provider value={{ title, setTitle, headerBg, setHeaderBg }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("useHeader must be used within HeaderProvider");
  return context;
};