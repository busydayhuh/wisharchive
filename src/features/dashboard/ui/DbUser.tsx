import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { Share2 } from "lucide-react";
import { memo } from "react";
import { copyUrl } from "../model/copyUrl";
import type { FoundUser } from "../model/useFindUser";

const DashboardUser = memo(function DashboardUser({
  user,
  isPending,
  error,
}: FoundUser) {
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Ошибка</div>;
  if (user)
    return (
      <div className="flex items-center gap-3">
        <Avatar className="p-0.5 border-1 border-foreground rounded-full w-9 md:w-11 h-9 md:h-11 overflow-visible">
          <AvatarImage src={user.userAvatar} alt={user.userName} />
          <AvatarFallback className="rounded-full text-sm md:text-base">
            ВП
          </AvatarFallback>
        </Avatar>
        <div className="grid text-left">
          <span className="font-semibold text-xl md:text-2xl truncate leading-tight">
            {user.userName}
          </span>
          <span className="text-xs md:text-sm truncate leading-tight">
            @{user.userId}
          </span>
        </div>
        <Button
          size="sm"
          className="shadow-0 rounded-full w-7 h-7"
          onClick={copyUrl}
        >
          <Share2 className="size-3" />
        </Button>
      </div>
    );
});

export default DashboardUser;
