export interface Chat {
  id: string;
  title: string;
  date: string;
}

// ハッカソン用の共通モックデータ
export const MOCK_CHATS: Chat[] = [
  { id: "a", title: "shadcn/uiでNext.jsサイドバー実装", date: "2 mins ago" },
  { id: "b", title: "木構造DB保存の最適解", date: "1 hour ago" },
  { id: "c", title: "AIChat UI デザイン案", date: "1 day ago" },
];

/**
 * すべての会話履歴を取得（サイドバー用）
 */
export async function getAllChats(): Promise<Chat[]> {
  // 本番は: const res = await fetch('/api/chats'); return res.json();
  return MOCK_CHATS;
}

/**
 * 特定の会話をIDで取得（チャット詳細用）
 */
export async function getChatById(id: string): Promise<Chat> {
  // 本番は: const res = await fetch(`/api/chats/${id}`); return res.json();
  const chat = MOCK_CHATS.find((c) => c.id === id);
  return chat || { id, title: "新しい会話", date: "Just now" };
}