import { cn } from "@/lib/utils";
import { SubChatWindow } from "@/components/chat/sub-chat-window";

interface SplitWindowProps {
  chatId: string;
  className?: string; // 外部から幅や高さを調整できるようにする
  mockData?: any; // デモ用のモックデータ
}

export function SplitWindow({ chatId: _chatId, className, mockData }: SplitWindowProps) {
  // モックデータからブランチIDを抽出（デモ用）
  const branchId = mockData?.branches?.[0]?.branch_id || "unknown";

  return (
    <div className={cn("flex flex-col h-full bg-background relative border rounded-md shadow-sm overflow-hidden", className)}>
      <SubChatWindow branchId={branchId} />
    </div>
  );
}
