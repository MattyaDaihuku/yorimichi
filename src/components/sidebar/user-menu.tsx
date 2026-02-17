// import { Button } from "@/components/ui/button";
// import { Settings, LogOut, User } from "lucide-react";

// interface UserMenuProps {
//   onClickItem?: () => void;
// }

// export function UserMenu({ onClickItem }: UserMenuProps) {
//   return (
//     <div className="p-4 flex flex-col gap-1 bg-muted/30">
//       {/* ユーザー情報 */}
//       <div className="flex items-center gap-3 mb-3 px-2">
//         <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
//             <User className="h-5 w-5" />
//         </div>
//         <div className="flex flex-col overflow-hidden">
//           <span className="text-sm font-medium truncate">Tokunaga Taiga</span>
//           <span className="text-xs text-muted-foreground truncate">Free Plan</span>
//         </div>
//       </div>

//       <Button 
//         variant="ghost" 
//         className="justify-start gap-2 h-9 px-2" 
//         onClick={onClickItem}
//       >
//         <Settings className="h-4 w-4 text-muted-foreground" />
//         Settings
//       </Button>
      
//       <Button 
//         variant="ghost" 
//         className="justify-start gap-2 h-9 px-2 text-destructive hover:text-destructive hover:bg-destructive/10" 
//         onClick={onClickItem}
//       >
//         <LogOut className="h-4 w-4" />
//         Log out
//       </Button>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  isExpanded: boolean;
  onClickItem?: () => void;
}

export function UserMenu({ isExpanded, onClickItem }: UserMenuProps) {
  return (
    <div className={cn("p-2 flex flex-col gap-1", isExpanded ? "items-stretch" : "items-center")}>
      
      {isExpanded ? (
        // 展開時: 詳細表示
        <div className="flex items-center gap-3 mb-2 px-2 py-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              TT
          </div>
          <div className="flex flex-col overflow-hidden text-left">
            <span className="text-sm font-medium truncate">Tokunaga Taiga</span>
            <span className="text-xs text-muted-foreground truncate">Free Plan</span>
          </div>
        </div>
      ) : (
         // 縮小時: アイコンのみ
         <div className="mb-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold cursor-pointer hover:ring-2 ring-primary/20">
            TT
         </div>
      )}

      {/* 設定ボタン */}
      <Button 
        variant="ghost" 
        size={isExpanded ? "default" : "icon"}
        className={cn("justify-start", !isExpanded && "h-10 w-10 rounded-full")}
        onClick={onClickItem}
        title="Settings"
      >
        <Settings className="h-5 w-5 text-muted-foreground" />
        {isExpanded && <span className="ml-2">Settings</span>}
      </Button>
    </div>
  );
}