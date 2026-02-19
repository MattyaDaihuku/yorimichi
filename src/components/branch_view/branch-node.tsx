"use client";

import { BranchNodeData } from "./types";

type BranchNodeProps = {
  node: BranchNodeData;
  isRoot: boolean;
  selectedBranchId: string | null;
  onSelect: (branchId: string) => void;
  maxDepth: number;
};

export function BranchNode({ node, isRoot, selectedBranchId, onSelect, maxDepth }: BranchNodeProps) {
  const titleChars = Array.from(node.branch_title ?? "");
  const displayTitle =
    titleChars.length > 10 ? `${titleChars.slice(0, 10).join("")}...` : node.branch_title;

  const nodeWidthByMaxDepth: Record<number, number> = {
    1: 800,
    2: 350,
    3: 220,
  };
  const childGapByMaxDepth: Record<number, number> = {
    1: 56,
    2: 40,
    3: 28,
  };
  const childMarginTopByMaxDepth: Record<number, number> = {
    1: 0,
    2: 150,
    3: 30,
  };

  const nodeWidth = nodeWidthByMaxDepth[maxDepth] ?? 140;
  const childGap = childGapByMaxDepth[maxDepth] ?? 12;
  const childMarginTop = childMarginTopByMaxDepth[maxDepth] ?? 16;

  const isSelected = selectedBranchId === node.branch_id;

  return (
    <div className="flex flex-col items-center overflow-visible">
      {/* ノードをつなぐ線と中点 */}
      {!isRoot && (
        <div className="flex flex-col items-center">
          <div className="w-[2px] bg-gray-300 h-25" />
          <div className="w-3 h-3 bg-gray-400 rounded-full" />
          <div className="w-[2px] bg-gray-300 h-25" />
        </div>
      )}

      {/* ノードの外枠サイズ */}
      <div className="h-40 w-15 flex items-center justify-center shrink-0 overflow-visible">
        <button
          type="button"
          onClick={() => onSelect(node.branch_id)}
          className={`
            flex shrink-0 justify-center items-center px-4 py-1 rounded-2xl border-2 transition-all cursor-pointer shadow-sm whitespace-nowrap
            ${isRoot ? "border-blue-300 bg-blue-100 text-blue-900" : "border-black bg-white text-black"}
            ${isSelected ? "ring-2 ring-offset-2 ring-blue-500" : "hover:opacity-80"}
          `}
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center",
            display: "inline-flex",
            width: `${nodeWidth}px`,
            height: "50px",
          }}
        >
          <span className="text-xl font-semibold tracking-widest">{displayTitle}</span>
        </button>
      </div>

      {/* 子ノードの表示 */}
      {node.children.length > 0 && (
        <div
          className="flex items-start justify-center"
          style={{ marginTop: `${childMarginTop}px`, gap: `${childGap}px` }}
        >
          {node.children.map((child) => (
            <BranchNode
              key={child.branch_id}
              node={child}
              isRoot={false}
              selectedBranchId={selectedBranchId}
              onSelect={onSelect}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
}