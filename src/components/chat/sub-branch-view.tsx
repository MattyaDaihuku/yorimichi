"use client";

import { ChatUIContainer } from "@/components/chat/chat-ui-container";
import { BranchTree } from "@/components/branch_view/parent_track";
import type { ChatDetailResponse } from "@/store/chat-store";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";

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
    const [panelState, setPanelState] = useState<"hidden-left" | "visible">("hidden-left");

    const chatData = useChatStore((state) => state.chatData);
    const isLoading = useChatStore((state) => state.isLoading);

    return (
        <div className="flex h-full w-full overflow-hidden">
            <div
                className={cn(
                    "hidden md:block h-full bg-background overflow-hidden transition-all duration-150",
                    panelState === "visible"
                        ? "shrink-0 basis-[280px] lg:basis-[320px] xl:basis-[360px] max-w-[38vw] min-w-[240px]"
                        : "shrink-0 w-auto basis-auto min-w-0 max-w-none"
                )}
            >
                <BranchTree
                    chatId={chatId}
                    chatData={chatData}
                    isLoading={isLoading}
                    onPanelStateChange={setPanelState}

                />
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
                    chatData={chatData}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
