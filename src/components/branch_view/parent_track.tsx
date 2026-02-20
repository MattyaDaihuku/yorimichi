"use client";

import useSWR from "swr";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BranchConversationPanel } from "./branch-conversation-panel";
import { BranchNode } from "./branch-node";
import { Block, BranchNodeData } from "./types";
import type { ChatDetailResponse } from "@/store/chat-store"; // 追加

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BranchTree({
  chatId,
  chatData,
  isLoading,
  onPanelStateChange,
}: {
  chatId: string;
  chatData: ChatDetailResponse | null;
  isLoading?: boolean;
  onPanelStateChange?: (state: "hidden-left" | "visible") => void;
}) {
  // const { data, error, isLoading } = useSWR<ChatDetailResponse>(
  //   `/api/internal/chat/${chatId}`,
  //   fetcher
  // );
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [panelState, setPanelState] = useState<"hidden-left" | "visible">("hidden-left");
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const availableHeight = useMemo(() => {
    // 画面全体の高さから、ヘッダーやパディング分を考慮した「表示可能領域」を計算
    return windowHeight * 0.85;
  }, [windowHeight]);

  const branchesMap = chatData?.branches ?? {};
  const blocksMap = chatData?.blocks ?? {};

  const { roots, nodesMap, maxDepth } = useMemo(() => {
    const allBranches = Object.values(branchesMap);

    if (allBranches.length === 0) {
      return { roots: [], nodesMap: {} as Record<string, BranchNodeData>, maxDepth: 0 };
    }

    // 1) depth が最大のブランチを起点にする
    const deepest = allBranches.reduce((acc, cur) => (cur.depth > acc.depth ? cur : acc), allBranches[0]);

    // 2) 親を辿れるように索引化
    const byId = new Map(allBranches.map((b) => [b.branch_id, b]));

    // 3) deepest -> parent -> parent ... の branch_id を配列化
    const lineageLeafToRootIds: string[] = [];
    const visited = new Set<string>();

    let current: (typeof allBranches)[number] | null = deepest;
    while (current && !visited.has(current.branch_id)) {
      visited.add(current.branch_id);
      lineageLeafToRootIds.push(current.branch_id);

      current = current.parent_branch_id ? byId.get(current.parent_branch_id) ?? null : null;
    }

    // root -> ... -> leaf の順に並べ替え
    const lineageRootToLeafIds = [...lineageLeafToRootIds].reverse();

    // 最後の要素（leaf）を表示対象から除外
    const visibleLineageIds = lineageRootToLeafIds.slice(0, -1);

    // 4) 直列ツリーを構築（1親1子の鎖）
    const map: Record<string, BranchNodeData> = {};
    visibleLineageIds.forEach((id) => {
      const branch = byId.get(id);
      if (!branch) return;
      map[id] = { ...branch, children: [] };
    });

    for (let i = 0; i < visibleLineageIds.length - 1; i++) {
      const parentId = visibleLineageIds[i];
      const childId = visibleLineageIds[i + 1];
      if (map[parentId] && map[childId]) {
        map[parentId].children.push(map[childId]);
      }
    }

    const rootId = visibleLineageIds[0];
    const roots = rootId && map[rootId] ? [map[rootId]] : [];

    const maxDepth = visibleLineageIds.reduce((max, id) => {
      const b = byId.get(id);
      return b ? Math.max(max, b.depth) : max;
    }, 0);

    if (process.env.NODE_ENV === "development") {
      console.log(
        "[BranchTree] visible lineage titles (without last):",
        visibleLineageIds.map((id) => byId.get(id)?.branch_title)
      );
    }

    return { roots, nodesMap: map, maxDepth };
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

  useEffect(() => {
    onPanelStateChange?.(panelState);
  }, [panelState, onPanelStateChange]);

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

    // 中身だけ切り替え
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
  if (isLoading) return <div className="p-4 text-center text-red-500">エラーが発生しました</div>;
  if (!chatData?.branches) return null;

  return (
    <div className="p-3 mt-0 h-full flex flex-col min-h-0 bg-transparent">
      <div className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">
        <div className="inline-flex items-stretch gap-6 pt-2.5 min-w-0">
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
                availableHeight={availableHeight}
              />
            ))}
          </div>

          <div
            className={cn(
              "self-stretch overflow-hidden transition-all duration-150 ease-out",
              panelState === "visible" ? "w-[340px] opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-8"
            )}
          >
            <div className="h-full w-full shrink-0 overflow-hidden">
              <div
                className={cn(
                  "transition-all duration-150 ease-out",
                  panelState === "visible"
                    ? "opacity-100 translate-x-0 pointer-events-auto"
                    : "opacity-0 -translate-x-5 pointer-events-none"
                )}
              >
                <BranchConversationPanel
                  selectedBranch={selectedBranch}
                  blocks={selectedBlocks}
                  containerHeight={availableHeight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}