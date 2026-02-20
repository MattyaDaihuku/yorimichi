"use client";

import { ChatUIContainer } from "@/components/chat/chat-ui-container";
import { BranchTree } from "@/components/branch_view/parent_track";
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
        <div className="flex h-full w-full overflow-hidden">
            <div className="hidden md:block h-full border-r bg-background shrink-0 w-[420px]">
                <BranchTree chatId={chatId} />
            </div>
            <div className="flex-1 min-w-0 h-full">
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
        </div>
    );
}
