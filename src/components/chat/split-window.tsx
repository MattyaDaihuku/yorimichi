import { cn } from "@/lib/utils";

interface SplitWindowProps {
  chatId: string;
  className?: string; // 外部から幅や高さを調整できるようにする
  mockData?: any; // デモ用のモックデータ
}

export function SplitWindow({ chatId: _chatId, className, mockData: _mockData }: SplitWindowProps) {
  // 最小限の状態管理やデータ取得ロジックは残しても良いが、表示は空にする要望
  // データフェッチのeffect等はデモ用として残しておいても害はないが、
  // 表示要素は徹底的に削除する。

  return (
    <div className={cn("flex flex-col h-full bg-background relative border rounded-md shadow-sm", className)}>
      {/* 
         ユーザー要望により、ヘッダー、メッセージリスト、入力欄すべてを削除。
         枠と、親コンポーネント(ChatUIContainer)が管理する「×」ボタンのみが残る形となる。
         中身は空白（あるいは将来的に何か入るスペースとしての空div）。
       */}
      <div className="flex-1 flex items-center justify-center text-muted-foreground/20 select-none">
        {/* Empty State / Placeholder */}
        Chat Window
      </div>
    </div>
  );
}
