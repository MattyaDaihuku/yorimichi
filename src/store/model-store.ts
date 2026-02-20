"use client";

import { create } from "zustand";
import { ACTIVE_MODEL, type AiModel } from "@/lib/ai-active-model";

type ModelStore = {
    selectedModel: AiModel;
    setSelectedModel: (model: AiModel) => void;
};

export const useModelStore = create<ModelStore>((set) => ({
    selectedModel: ACTIVE_MODEL,
    setSelectedModel: (model) => set({ selectedModel: model }),
}));
