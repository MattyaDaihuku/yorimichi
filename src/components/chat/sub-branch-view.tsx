"use client";

import { ChatUIContainer } from "@/components/chat/chat-ui-container";
import type { ChatDetailResponse } from "@/store/chat-store";

type BranchItem = ChatDetailResponse["branches"][string];

interface SubBranchViewProps {
    chatId: string;
    mainBranch: BranchItem;
    initialActiveBranchId?: string;
    initialCreationContext?: {
        parentBlockId: string;
    };
    reload: () => Promise<void>;
    onCloseAll: () => void;
    onBranch: (blockId: string) => void;
}

export function SubBranchView({
    chatId,
    mainBranch,
    initialActiveBranchId,
    initialCreationContext,
    reload,
    onCloseAll,
    onBranch
}: SubBranchViewProps) {
    return (
        <div className="h-full w-full">
            <ChatUIContainer
                chatId={chatId}
                mainBranchId={mainBranch.branch_id}
                initialActiveBranchId={initialActiveBranchId}
                initialCreationContext={initialCreationContext}
                reload={reload}
                onCloseAll={onCloseAll}
                onBranch={onBranch}
            />
        </div>
    );
}
