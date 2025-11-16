import { cn } from "@/shared/lib/css";
import { useUser } from "@/shared/model/user/useUser";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { CakeIcon, Ghost, Meh } from "lucide-react";
import { memo } from "react";
import { getUserBirthday } from "../../model/getUserBirthday";
import { OwnerInfoPopover } from "./OwnerInfoPopover";

const DashboardOwner = memo(function DashboardOwner({
  userId,
  isOwner,
  className,
}: {
  userId?: string;
  isOwner?: boolean;
  className?: string;
}) {
  const { user, isLoading, error } = useUser(userId);

  if (isLoading)
    return isOwner ? (
      <Skeleton className="rounded-full size-12" />
    ) : (
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full size-12" />
        <div className="space-y-1">
          <Skeleton className="w-36 h-6" />
          <Skeleton className="w-30 h-6" />
        </div>
      </div>
    );

  if (error || !user)
    return isOwner ? (
      <div className="place-content-center grid bg-muted/80 rounded-full size-12">
        <Meh className="text-muted-foreground" />
      </div>
    ) : (
      <div className="flex items-center gap-3">
        <div className="place-content-center grid bg-muted/80 rounded-full size-12">
          <Ghost className="stroke-1 text-muted-foreground" />
        </div>
        <p className="font-semibold text-lg md:text-2xl truncate leading-tight">
          Пользователь не найден
        </p>
      </div>
    );

  if (user && !isOwner)
    return (
      <div className={cn("flex md:flex-col items-center gap-3", className)}>
        <UserAvatar
          name={user.userName}
          id={user.userId}
          avatarURL={user.avatarURL ?? undefined}
          className="p-0.5 border-1 border-muted/90"
          size="xl"
        />
        <div className="flex flex-col md:items-center gap-2">
          <p className="font-semibold text-xl md:text-2xl truncate leading-tight">
            {user.userName}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm truncate leading-tight">
            @{user.userId}
          </p>
          {user.birthDate && (
            <p className="inline-flex items-center gap-1 text-muted-foreground text-xs leading-none">
              <CakeIcon className="size-3" />
              {getUserBirthday(user.birthDate as string)}
            </p>
          )}
        </div>
      </div>
    );

  if (user && isOwner)
    return (
      <OwnerInfoPopover
        name={user.userName}
        id={user.userId}
        avatarURL={user.avatarURL ?? undefined}
        birthDate={user.birthDate as string}
      />
    );
});

export default DashboardOwner;
