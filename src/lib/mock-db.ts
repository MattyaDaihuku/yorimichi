// src/lib/mock-db.ts
import { ChatList, Branch, Block } from "@/types/db";

// チャットリスト (ER図のCHATLIST)
export const chatLists: ChatList[] = [
  {
    chat_id: "c-1",
    user_id: "u-1",
    main_branch_id: "b-1",
    is_pinned: false,
    chat_title: "shadcn/uiでNext.js実装",
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 mins ago
    update_at: new Date().toISOString(),
  },
  {
    chat_id: "c-2",
    user_id: "u-1",
    main_branch_id: "b-2",
    is_pinned: true,
    chat_title: "木構造DB保存の最適解",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    update_at: new Date().toISOString(),
  },
];

// ブランチ (ER図のBRANCHES)
export const branches: Branch[] = [
  // c-1 のメインブランチ
  {
    branch_id: "b-1",
    chat_id: "c-1",
    parent_branch_id: null,
    parent_block_id: null,
    branch_title: "Main Branch",
    status: "active",
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  },
  // c-2 のメインブランチ
  {
    branch_id: "b-2",
    chat_id: "c-2",
    parent_branch_id: null,
    parent_block_id: null,
    branch_title: "Main Branch",
    status: "active",
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  },
];

// ブロック (ER図のBLOCK)
export const blocks: Block[] = [
  {
    block_id: "blk-1",
    branch_id: "b-1",
    user_content: "Next.js 16でサイドバーを作りたいです。",
    ai_content: "shadcn/uiのSheetコンポーネントを使うのがおすすめです。",
    created_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
  },
];