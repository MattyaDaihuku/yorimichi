"use client";

import useSWR from "swr";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BranchConversationPanel } from "./branch-conversation-panel";
import { BranchNode } from "./branch-node";
import { Block, BranchNodeData, ChatDetailResponse } from "./types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BranchTree({ chatId }: { chatId: string }) {
  const { data, error, isLoading } = useSWR<ChatDetailResponse>(
    `/api/internal/chat/${chatId}`,
    fetcher
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [panelState, setPanelState] = useState<"hidden-left" | "visible">("hidden-left");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const branchesMap = data?.branches ?? {};
  const blocksMap = data?.blocks ?? {};

  const { roots, nodesMap, maxDepth } = useMemo(() => {
    const allBranches = Object.values(branchesMap);

    const maxDepth = allBranches.reduce((max, b) => Math.max(max, b.depth), -Infinity);

    if (allBranches.length === 0 || maxDepth === 0) {
      return { roots: [], nodesMap: {} as Record<string, BranchNodeData>, maxDepth: 0 };
    }

    const map: Record<string, BranchNodeData> = {};
    let rootNodes: BranchNodeData[] = [];

    allBranches.forEach((branch) => {
      map[branch.branch_id] = { ...branch, children: [] };
    });

    Object.values(map).forEach((node) => {
      if (node.parent_branch_id && map[node.parent_branch_id]) {
        map[node.parent_branch_id].children.push(node);
      } else {
        rootNodes.push(node);
      }
    });

    // 木構造の最後の要素を除外
    const ordered: BranchNodeData[] = [];
    const walk = (node: BranchNodeData) => {
      ordered.push(node);
      node.children.forEach(walk);
    };
    rootNodes.forEach(walk);

    const lastNode = ordered.at(-1);
    if (lastNode) {
      if (lastNode.parent_branch_id && map[lastNode.parent_branch_id]) {
        map[lastNode.parent_branch_id].children = map[lastNode.parent_branch_id].children.filter(
          (child) => child.branch_id !== lastNode.branch_id
        );
      } else {
        rootNodes = rootNodes.filter((root) => root.branch_id !== lastNode.branch_id);
      }
      delete map[lastNode.branch_id];
    }

    return { roots: rootNodes, nodesMap: map, maxDepth };
  }, [branchesMap]);

  useEffect(() => {
    // 表示対象に残っていれば維持
    if (selectedBranchId && nodesMap[selectedBranchId]) return;
    // なければ先頭を選択（なければnull）
    setSelectedBranchId(roots[0]?.branch_id ?? null);
  }, [roots, nodesMap, selectedBranchId]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // 親ブランチの会話を表示
  const handleSelectBranch = (branchId: string) => {
    const isSame = branchId === selectedBranchId;

    if (isSame) {
      // スライドアウト
      if (panelState === "visible") {
        setPanelState("hidden-left");
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
          setPanelState("hidden-left");
        }, 280);
        // スライドイン
      } else {
        setSelectedBranchId(branchId);
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
        setPanelState("visible");
      }
      return;
    }

    // 中身だけ切り替え（開いていなければ開く）
    setSelectedBranchId(branchId);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setPanelState("visible");
  };

  const blocksByBranch = useMemo(() => {
    const grouped: Record<string, Block[]> = {};
    Object.values(blocksMap).forEach((block) => {
      if (!grouped[block.branch_id]) grouped[block.branch_id] = [];
      grouped[block.branch_id].push(block);
    });
    Object.values(grouped).forEach((arr) =>
      arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    );
    return grouped;
  }, [blocksMap]);

  const selectedBlocks = selectedBranchId ? blocksByBranch[selectedBranchId] ?? [] : [];
  const selectedBranch = selectedBranchId ? nodesMap[selectedBranchId] ?? null : null;

  if (isLoading) return <div className="p-4 text-center text-muted-foreground">読み込み中...</div>;
  if (error) return <div className="p-4 text-center text-red-500">エラーが発生しました</div>;
  if (!data?.branches) return null;

  return (
    <div className="p-3 mt-0 min-h-full">
      <div className="overflow-auto">
        <div
          className="inline-flex items-start gap-6 pt-2.5"
        >
          <div className="flex flex-col items-start justify-start">
            {roots.map((rootNode) => (
              <BranchNode
                key={rootNode.branch_id}
                node={rootNode}
                isRoot
                selectedBranchId={selectedBranchId}
                onSelect={handleSelectBranch}
                maxDepth={maxDepth}
                isPanelVisible={panelState === "visible"}
              />
            ))}
          </div>

          <div
            className={cn(
              "h-full overflow-hidden transition-all duration-150 ease-out",
              panelState === "visible" && "w-[340px] opacity-100 translate-x-0",
              panelState === "hidden-left" && "opacity-0 translate-x-8",
              panelState === "hidden-left" && "opacity-0 -translate-x-8"
            )}
          >
            <div className="h-full w-[340px] shrink-0 overflow-hidden">
              <div
                className={cn(
                  "transition-all duration-150 ease-out",
                  panelState === "visible" && "opacity-150 translate-x-0 pointer-events-auto",
                  panelState === "hidden-left" && "opacity-0 translate-x-5 pointer-events-none",
                  panelState === "hidden-left" && "opacity-0 -translate-x-5 pointer-events-none"
                )}
              >
                <BranchConversationPanel selectedBranch={selectedBranch} blocks={selectedBlocks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}