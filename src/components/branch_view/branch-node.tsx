"use client";

import { BranchNodeData } from "./types";

type BranchNodeProps = {
  node: BranchNodeData;
  isRoot: boolean;
  selectedBranchId: string | null;
  onSelect: (branchId: string) => void;
  maxDepth: number;
  isPanelVisible: boolean;
  availableHeight: number;
};

export function BranchNode({
  node,
  isRoot,
  selectedBranchId,
  onSelect,
  maxDepth,
  isPanelVisible,
  availableHeight,
}: BranchNodeProps) {
  const titleChars = Array.from(node.branch_title ?? "");
  const displayTitle =
    titleChars.length > 10 ? `${titleChars.slice(0, 10).join("")}...` : node.branch_title;

  const isSelected = selectedBranchId === node.branch_id;
  const isFloating = isSelected && isPanelVisible;
  const isBottomNode = node.children.length === 0;

  // 比率に基づいた高さの計算 (ノード:コネクタ = 3:1)
  const totalUnits = (maxDepth + 1) * 3 + maxDepth * 1;
  const unitHeight = availableHeight / totalUnits;

  const nodeHeight = unitHeight * 3;
  const connectorHeight = unitHeight;
  const lineHeight = Math.max(0, (connectorHeight - 12) / 2); // 12pxは中央の丸の高さ

  return (
    <div className="flex flex-col items-center min-w-min ml-1">

      {/* ノードをつなぐ線と中点 */}
      {!isRoot && (
        <div className="flex flex-col items-center">
          <div className="w-[2px] bg-gray-300" style={{ height: `${lineHeight}px` }} />
          <div className="w-3 h-3 bg-gray-400 rounded-full" />
          <div className="w-[2px] bg-gray-300" style={{ height: `${lineHeight}px` }} />
        </div>
      )}

      {/* ノード本体 */}
      <div className="flex items-center justify-center shrink-0">
        <button
          type="button"
          onClick={() => onSelect(node.branch_id)}
          className={`
            relative flex shrink-0 justify-center items-center rounded-2xl border-1 transition-all cursor-pointer
            w-10 
            ${isBottomNode ? "border-blue-300 bg-blue-100" : "border-gray-300 bg-white "}
            ${isFloating ? "-translate-y-0 border-3 text-gray-600 font-bold" : "shadow-sm text-gray-400 font-semibold"}
          `}
          style={{ height: `${nodeHeight}px` }}
        >
          {/* 中のテキストだけを90度回転させる */}
          <span
            className="absolute text-sm tracking-widest whitespace-nowrap"
            style={{ transform: "rotate(90deg)" }}
          >
            {displayTitle}
          </span>
        </button>
      </div>

      {/* 子ノードの表示 */}
      {node.children.length > 0 && (
        <div className="flex items-start justify-center gap-6">
          {node.children.map((child) => (
            <BranchNode
              key={child.branch_id}
              node={child}
              isRoot={false}
              selectedBranchId={selectedBranchId}
              onSelect={onSelect}
              maxDepth={maxDepth}
              isPanelVisible={isPanelVisible}
              availableHeight={availableHeight}
            />
          ))}
        </div>
      )}
    </div>
  );
}