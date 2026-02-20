"use client";

import { create } from "zustand";
import type { Block, Branches, Chatlist } from "@/generated/prisma";

type SerializedBranch = Omit<Branches, "created_at" | "update_at"> & {
    created_at: string;
    update_at: string;
};

type SerializedBlock = Omit<Block, "created_at" | "update_at"> & {
    created_at: string;
    update_at: string;
};

export type ChatDetailResponse = {
    chat_id: Chatlist["chat_id"];
    chat_title: Chatlist["chat_title"];
    created_at: string;
    branches: Record<string, SerializedBranch>;
    blocks: Record<string, SerializedBlock>;
};

type ChatStore = {
    chatData: ChatDetailResponse | null;
    isLoading: boolean;
    error: string | null;
    fetchChat: (chatId: string) => Promise<void>;
    addBranch: (branch: SerializedBranch) => void;
    addBlock: (block: SerializedBlock) => void;
    removeBranch: (branchId: string) => void;
    clearChat: () => void;
    currentIds: {
        chatId: string | null;
        branchId: string | null;
        blockId: string | null;
    };
    setCurrentIds: (ids: Partial<{ chatId: string; branchId: string; blockId: string }>) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
    chatData: null,
    isLoading: false,
    error: null,

    fetchChat: async (chatId: string) => {
        set({ isLoading: true, error: null });

        try {
            const res = await fetch(`/api/internal/chat/${chatId}`);
            if (!res.ok) throw new Error("Failed to fetch chat");

            const data: ChatDetailResponse = await res.json();
            set({ chatData: data, isLoading: false, error: null });
        } catch (error) {
            console.error(error);
            set({ isLoading: false, error: "チャットの取得に失敗しました" });
        }
    },

    addBranch: (branch) => {
        set((state) => {
            if (!state.chatData) return state;
            return {
                chatData: {
                    ...state.chatData,
                    branches: {
                        ...state.chatData.branches,
                        [branch.branch_id]: branch,
                    },
                },
            };
        });
    },

    addBlock: (block) => {
        set((state) => {
            if (!state.chatData) return state;
            return {
                chatData: {
                    ...state.chatData,
                    blocks: {
                        ...state.chatData.blocks,
                        [block.block_id]: block,
                    },
                },
            };
        });
    },

    removeBranch: (branchId) => {
        set((state) => {
            if (!state.chatData) return state;
            const newBranches = { ...state.chatData.branches };
            delete newBranches[branchId];

            const newBlocks = { ...state.chatData.blocks };
            Object.keys(newBlocks).forEach(id => {
                if (newBlocks[id].branch_id === branchId) {
                    delete newBlocks[id];
                }
            });

            return {
                chatData: {
                    ...state.chatData,
                    branches: newBranches,
                    blocks: newBlocks
                }
            };
        });
    },

    // ... (existing code)

    clearChat: () => {
        set({ chatData: null, isLoading: false, error: null, currentIds: { chatId: null, branchId: null, blockId: null } });
    },

    currentIds: {
        chatId: null,
        branchId: null,
        blockId: null,
    },

    setCurrentIds: (ids) => {
        set((state) => ({
            currentIds: {
                ...state.currentIds,
                ...ids,
            },
        }));
    },
}));

export function getHistoryFromChatData(chatData: ChatDetailResponse, endBlockId: string): { role: "user" | "assistant"; content: string }[] {
    const blocks = Object.values(chatData.blocks);
    const targetBlock = chatData.blocks[endBlockId];

    if (!targetBlock) return [];

    const branchChain: { branchId: string; endBlockId: string }[] = [];
    let currBranchId = targetBlock.branch_id;
    let currEndBlockId = endBlockId;

    while (currBranchId) {
        branchChain.unshift({ branchId: currBranchId, endBlockId: currEndBlockId });
        const branch = chatData.branches[currBranchId];
        if (!branch?.parent_branch_id) break;
        currBranchId = branch.parent_branch_id;
        currEndBlockId = branch.parent_block_id!;
    }

    const finalHistory: { role: "user" | "assistant"; content: string }[] = [];

    for (const link of branchChain) {
        const branchBlocks = blocks
            .filter((b) => b.branch_id === link.branchId)
            .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

        for (const block of branchBlocks) {
            finalHistory.push({ role: "user", content: block.user_content });
            if (block.ai_content) {
                finalHistory.push({ role: "assistant", content: block.ai_content });
            }
            if (block.block_id === link.endBlockId) break;
        }
    }

    return finalHistory;
}
