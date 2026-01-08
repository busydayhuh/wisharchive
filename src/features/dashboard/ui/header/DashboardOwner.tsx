import { useUser } from "@/features/profile";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { OwnerInfoPopover } from "@/shared/ui/components/OwnerInfoPopover";
import { UserAvatar } from "@/shared/ui/components/UserAvatar";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { cn } from "@/shared/utils/css";
import { Ghost, Meh } from "lucide-react";

function DashboardOwner({
  userId,
  isOwner,
  className,
}: {
  userId?: string;
  isOwner?: boolean;
  className?: string;
}) {
  const { user, isLoading, error } = useUser(userId);
  const { hasSearchParams: profileView } = useAppLocation();

  if (error)
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

  if (isLoading || !user)
    return isOwner ? (
      <Skeleton className="rounded-full size-12" />
    ) : (
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="rounded-full size-12" />
        <div className="flex flex-col justify-center items-center gap-1">
          <Skeleton className="w-36 h-6" />
          <Skeleton className="w-30 h-6" />
        </div>
      </div>
    );

  if ((user && !isOwner) || profileView)
    return (
      <div
        className={cn(
          "flex md:flex-col items-start md:items-center gap-3",
          className
        )}
      >
        <UserAvatar
          name={user.userName}
          id={user.userId}
          avatarURL={user.avatarURL ?? undefined}
          className="p-0.5 border-1 border-muted/90"
          size="xl"
        />
        <div className="flex flex-col md:items-center gap-1 md:gap-2">
          <p className="font-headers font-bold text-xl md:text-2xl truncate leading-tight">
            {user.userName}
          </p>

          <p className="text-muted-foreground text-xs md:text-sm truncate leading-tight">
            @{user.userId}
          </p>

          <p className="text-muted-foreground text-xs md:text-sm truncate leading-tight">
            {user.bio}
          </p>
        </div>
      </div>
    );

  if (user && isOwner)
    return (
      <OwnerInfoPopover
        name={user.userName}
        id={user.userId}
        avatarURL={user.avatarURL ?? undefined}
        email={user.userEmail}
      />
    );
}

export default DashboardOwner;
