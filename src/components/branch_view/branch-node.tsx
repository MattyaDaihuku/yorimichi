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
  const isSelected = selectedBranchId === node.branch_id;
  const isFloating = isSelected && isPanelVisible;
  const isBottomNode = node.children.length === 0;

  // 比率に基づいた高さの計算 (ノード:コネクタ = 3:1)
  const totalUnits = (maxDepth + 1) * 3 + maxDepth * 1;
  const unitHeight = availableHeight / totalUnits;

  const nodeHeight = unitHeight * 3;
  const connectorHeight = unitHeight;
  const lineHeight = Math.max(0, (connectorHeight - 12) / 2); // 12pxは中央の丸の高さ

  // 枠のサイズ(nodeHeight)と文字数を連動させる
  // text-sm (14px) + letter-spacing, パディング等を考慮して1文字約16pxとして計算
  const paddingChars = 2; // 上下の余白分
  const maxChars = Math.max(1, Math.floor(nodeHeight / 16) - paddingChars);
  const titleChars = Array.from(node.branch_title ?? "");
  const displayTitle =
    titleChars.length > maxChars
      ? `${titleChars.slice(0, Math.max(1, maxChars - 1)).join("")}…`
      : node.branch_title;

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
            relative flex shrink-0 justify-center items-center rounded-full border-1 transition-all cursor-pointer
            w-10 
            ${isFloating
              ? "border-3 border-blue-300 text-gray-800 font-bold"
              : "border-gray-300 bg-white shadow-sm text-gray-400 font-semibold hover:border-3 hover:text-gray-600"}
          `}
          style={{
            height: `${nodeHeight}px`,
            backgroundColor: isFloating ? "#e6f0ff" : undefined
          }}
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