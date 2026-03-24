import { create } from "zustand";

type SettingsTab = "general" | "api" | "custom";

interface SettingsDialogStore {
  /** ダイアログの開閉状態 */
  isOpen: boolean;
  /** 開いた際にアクティブにするタブ */
  activeTab: SettingsTab;
  /** ダイアログを開く（タブ指定可能） */
  open: (tab?: SettingsTab) => void;
  /** ダイアログを閉じる */
  close: () => void;
  /** 開閉の切り替え */
  setOpen: (open: boolean) => void;
}

export const useSettingsDialogStore = create<SettingsDialogStore>((set) => ({
  isOpen: false,
  activeTab: "general",
  open: (tab = "general") => set({ isOpen: true, activeTab: tab }),
  close: () => set({ isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
}));
