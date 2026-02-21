import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddBranchButtonProps {
  onClick: () => void;
  isFullWidth?: boolean;
  className?: string;
}

export function AddBranchButton({ onClick, isFullWidth, className }: AddBranchButtonProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-muted/30 border-2 border-dashed border-muted-foreground/40 rounded-4xl shadow-sm hover:bg-muted/80 transition-colors cursor-pointer group",
        isFullWidth ? "flex-1 w-full h-full" : "w-10 shrink-0",
        className
      )}
      onClick={onClick}
    >
      <Plus className="w-6 h-6 text-muted-foreground/60" />
    </div>
  );
}
