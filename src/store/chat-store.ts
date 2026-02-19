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
    clearChat: () => void;
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

    clearChat: () => {
        set({ chatData: null, isLoading: false, error: null });
    },
}));
