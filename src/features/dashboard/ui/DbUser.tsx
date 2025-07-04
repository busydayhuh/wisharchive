import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "lucide-react";
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
      <div className="flex items-center gap-3 ">
        <Avatar className="h-11 w-11 p-0.5 border-1 border-foreground rounded-xl relative after:content-['✨'] after:-left-3 after:-top-3 after:absolute  overflow-visible">
          <AvatarImage src={user.userAvatar} alt={user.userName} />
          <AvatarFallback className="rounded-xl">ВП</AvatarFallback>
        </Avatar>
        <div className="grid text-left">
          <span className="truncate font-semibold text-2xl leading-tight">
            {user.userName}
          </span>
          <span className="truncate text-sm leading-tight">@{user.userId}</span>
        </div>
        <Button
          size="sm"
          className="rounded-full ms-2 h-7 w-7 "
          onClick={copyUrl}
        >
          <Link className="size-3" />
        </Button>
      </div>
    );
});

export default DashboardUser;
