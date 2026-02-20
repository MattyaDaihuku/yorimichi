import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface DeleteBranchButtonProps {
  onRemove: () => void;
  className?: string;
}

export function DeleteBranchButton({ onRemove, className }: DeleteBranchButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full hover:bg-destructive/10 backdrop-blur-sm border shadow-sm transition-colors",
            className
          )}
          title="Delete window"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-0 w-[400px] sm:max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>ブランチ削除の確認</AlertDialogTitle>
          <AlertDialogDescription>
            本当にこのブランチを削除しますか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!flex-row justify-end gap-2">
          <AlertDialogCancel className="mt-0">キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={onRemove}
            variant="destructive"
          >
            削除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
