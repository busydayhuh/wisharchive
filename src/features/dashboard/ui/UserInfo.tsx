import type { UserDocumentType } from "@/shared/model/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import { Share2 } from "lucide-react";
import { memo } from "react";
import { copyUrl } from "../model/copyUrl";

const UserInfo = memo(function UserInfo({
  user,
  isLoading,
  error,
}: {
  user: UserDocumentType | undefined;
  isLoading: boolean;
  error: unknown;
}) {
  //TODO сделать скелетон для загрузки
  if (isLoading) return <div>Загрузка...</div>;
  if (error)
    return <div>Не удалось загрузить информацию о пользователе ☹️</div>;
  if (user)
    return (
      <div className="flex items-center gap-3">
        <Avatar className="p-0.5 border-1 border-foreground rounded-full w-9 md:w-11 h-9 md:h-11 overflow-visible">
          <AvatarImage src={user.avatarURL} alt={user.userName} />
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

export default UserInfo;
