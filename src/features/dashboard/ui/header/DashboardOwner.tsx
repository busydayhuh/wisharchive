import { useUser } from "@/shared/model/user/useUser";
import { Button } from "@/shared/ui/kit/button";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Share2 } from "lucide-react";
import { memo } from "react";

const DashboardOwner = memo(function DashboardOwner({
  userId,
  isOwner,
}: {
  userId?: string;
  isOwner?: boolean;
}) {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Загрузка...</div>;

  if (error)
    return <div>Не удалось загрузить информацию о пользователе ☹️</div>;

  if (user && !isOwner)
    return (
      <div className="flex items-center gap-3">
        <UserAvatar
          name={user.userName}
          id={user.userId}
          avatarURL={user.avatarURL ?? undefined}
          className="p-0.5 border-1 border-muted/90"
          size="lg"
        />
        <div className="grid text-left">
          <p className="font-semibold text-xl md:text-2xl truncate leading-tight">
            {user.userName}
          </p>
          <p className="text-xs md:text-sm truncate leading-tight">
            @{user.userId}
          </p>
        </div>
        <Button size="sm" className="shadow-0 rounded-full w-7 h-7">
          <Share2 className="size-3" />
        </Button>
      </div>
    );

  if (user && isOwner)
    return (
      <UserAvatar
        name={user.userName}
        id={user.userId}
        avatarURL={user.avatarURL ?? undefined}
        className="p-0.5 border-1 border-muted/90"
        size="lg"
      />
    );
});

export default DashboardOwner;
