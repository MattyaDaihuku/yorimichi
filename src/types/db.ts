export interface User {
    user_id: string;
    name: string;
    email: string;
    created_at: string;
    update_at: string;
}

export interface ChatList {
    chat_id: string;
    user_id: string;
    main_branch_id: string;
    is_pinned: boolean;
    chat_title: string;
    created_at: string;
    update_at: string;
}

export interface Branch {
    branch_id: string;
    chat_id: string;
    parent_branch_id: string | null;
    parent_block_id: string | null;
    branch_title: string;
    status: 'active' | 'merged' | 'locked' | 'dropped';
    created_at: string;
    update_at: string;
}

export interface Block {
    block_id: string;
    branch_id: string;
    user_content: string;
    ai_content: string;
    created_at: string;
    update_at: string;
}

// APIレスポンス用: チャット詳細にはブランチとブロックが含まれる
export interface ChatDetailResponse extends ChatList {
    branches: Branch[];
    blocks: Block[];
}