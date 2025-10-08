import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { ID } from "appwrite";
import { memo } from "react";
import type { CollaboratorType } from "../model/types";

type CollaboratorsAvatarsProps = {
  collaborators?: CollaboratorType[];
  isLoading?: boolean;
  error?: Error;
  size: "default" | "sm" | "lg";
  maxVisible: number;
  hideOwner?: boolean;
} & React.ComponentProps<"div">;

const SIZES = {
  default: "w-8 h-8",
  lg: "w-10 h-10",
  sm: "w-5 h-5",
};

const SPACING = {
  default: "-space-x-3",
  lg: "-space-x-4",
  sm: "-space-x-2",
};

export const CollaboratorsAvatars = memo(function CollaboratorsAvatars({
  collaborators,
  isLoading,
  error,
  size,
  maxVisible,
  hideOwner = false,
  className,
}: CollaboratorsAvatarsProps) {
  const visible = collaborators?.slice(0, maxVisible) ?? [];
  const remaining = (collaborators?.length ?? 0) - maxVisible;

  if (error) return "☹️ Не удалось загрузить соавторов";
  if (isLoading)
    return <CollaboratorsAvatarsSkeleton size={size} maxVisible={maxVisible} />;

  // в команде списка всегда как минимум 1 участник (владелец)
  // не показываем соавторов в карточках, если нет других участников
  // но всегда показываем в диалогах и на странице вишлиста, даже если в соавторах только автор
  if (collaborators && hideOwner && collaborators.length < 2) return null;

  if (collaborators)
    return (
      <div
        className={cn(
          "flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
          SPACING[size],
          className
        )}
      >
        {visible.map((c) => (
          <Avatar className={SIZES[size]} key={ID.unique()}>
            <AvatarImage src={c.avatarURL ?? undefined} alt={c.userName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))}

        {remaining > 0 && (
          <Avatar className={SIZES[size]}>
            <AvatarImage />
            <AvatarFallback className="text-xs">+{remaining}</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
});

export function CollaboratorsAvatarsSkeleton({
  size,
  maxVisible,
  className,
}: Pick<CollaboratorsAvatarsProps, "size" | "maxVisible"> &
  React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        SPACING[size],
        className
      )}
    >
      {[...Array(maxVisible ?? 3)].map((_, i) => (
        <div
          key={i}
          className={cn("bg-muted rounded-full animate-pulse", SIZES[size])}
        />
      ))}
    </div>
  );
}
