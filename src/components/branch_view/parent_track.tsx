// src/components/chat/branch-tree.tsx
"use client";

import useSWR from "swr";

type Branch = {
  branch_id: string;
  parent_branch_id: string | null;
  parent_block_id: string | null;
  branch_title: string;
  status: string;
  depth: number;
};

// 再帰描画用にchildrenを追加した型
type BranchNodeData = Branch & { children: BranchNodeData[] };

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BranchTree({ chatId }: { chatId: string }) {
  const { data, error, isLoading } = useSWR(`/api/internal/chat/${chatId}`, fetcher);

  if (isLoading) return <div className="p-4 text-center text-muted-foreground">読み込み中...</div>;
  if (error) return <div className="p-4 text-center text-red-500">エラーが発生しました</div>;
  if (!data || !data.branches) return null;

  // データをツリー構造に変換する
  const branchesMap: Record<string, Branch> = data.branches;
  const nodesMap: Record<string, BranchNodeData> = {};
  const roots: BranchNodeData[] = [];

  // 最後の要素を除外
  const branchList = Object.values(branchesMap).slice(0, -1);

  // 全ノードを初期化
  branchList.forEach((branch) => {
    nodesMap[branch.branch_id] = { ...branch, children: [] };
  });

  // 親子関係を構築
  Object.values(nodesMap).forEach((node) => {
    if (node.parent_branch_id && nodesMap[node.parent_branch_id]) {
      nodesMap[node.parent_branch_id].children.push(node);
    } else {
      roots.push(node); // 親がないものがルート
    }
  });

  return (
    <div className="flex flex-col items-start justify-start p-3 mt-10 min-h-full gap-6">
      {roots.map((rootNode) => (
        <BranchNode key={rootNode.branch_id} node={rootNode} isRoot={true} />
      ))}
    </div>
  );
}

// 再帰的にノードを描画する
function BranchNode({ node, isRoot }: { node: BranchNodeData; isRoot: boolean }) {
  const titleChars = Array.from(node.branch_title ?? "");
  const displayTitle =
    titleChars.length > 5 ? `${titleChars.slice(0, 10).join("")}...` : node.branch_title;

  return (
    <div className="flex flex-col items-center">
      {/* 子ノードは、接続線と分岐点のドットを描画 */}
      {!isRoot && (
        <div className="flex flex-col items-center">
          <div className="w-[2px] bg-gray-300 h-10"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-[2px] bg-gray-300 h-20"></div>
        </div>
      )}

      {/* 回転後の見た目サイズ分の領域を確保 */}
      <div className="h-28 w-16 flex items-center justify-center shrink-0">
        <div
          className={`
            flex justify-center items-center px-4 py-1 rounded-2xl border-2 transition-all hover:opacity-80 cursor-pointer shadow-sm whitespace-nowrap
            ${isRoot 
              ? "border-black bg-white text-black"
              : "border-blue-300 bg-blue-100 text-blue-900"
            }
          `}
          style={{
            transform: "rotate(90deg)",
            transformOrigin: "center",
            display: "inline-flex",
          }}
        >
          <span className="text-xl font-semibold tracking-widest">{displayTitle}</span>
        </div>
      </div>

      {/* 子ノードを等間隔で配置 */}
      {node.children.length > 0 && (
        <div className="flex items-start justify-center gap-12 mt-8">
          {node.children.map((child) => (
            <BranchNode key={child.branch_id} node={child} isRoot={false} />
          ))}
        </div>
      )}
    </div>
  );
}