export type Branch = {
  branch_id: string;
  parent_branch_id: string | null;
  parent_block_id: string | null;
  branch_title: string;
  status: string;
  depth: number;
};

export type Block = {
  block_id: string;
  branch_id: string;
  user_content: string;
  ai_content: string;
  created_at: string;
  update_at: string;
};

export type ChatDetailResponse = {
  branches: Record<string, Branch>;
  blocks: Record<string, Block>;
};

export type BranchNodeData = Branch & { children: BranchNodeData[] };