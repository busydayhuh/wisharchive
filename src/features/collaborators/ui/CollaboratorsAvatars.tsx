import { type CollaboratorType } from "@/features/collaborators/model/useCollaborators";
import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { ID } from "appwrite";
import { memo } from "react";

type CollaboratorsAvatarsProps = {
  collaborators: CollaboratorType[];
  size: "default" | "sm" | "lg";
  maxVisible: number;
  hideOwner?: boolean;
} & React.ComponentProps<"div">;

export const CollaboratorsAvatars = memo(function CollaboratorsAvatars({
  collaborators,
  size,
  maxVisible,
  hideOwner = false,
  className,
}: CollaboratorsAvatarsProps) {
  const visible = collaborators.slice(0, maxVisible);
  const remaining = collaborators.length - maxVisible;

  const sizes = {
    default: "w-8 h-8",
    lg: "w-10 h-10",
    sm: "w-5 h-5",
  };

  const spacing = {
    default: "-space-x-3",
    lg: "-space-x-4",
    sm: "-space-x-2",
  };

  if (!collaborators) return null;

  // в команде списка всегда как минимум 1 участник (владелец)
  // не показываем соавторов в карточках, если нет других участников
  // но показываем всех, включая владельца, в диалогах и на странице вишлиста
  if (hideOwner && collaborators.length < 2) return null;

  return (
    <div
      className={cn(
        "flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        spacing[size],
        className
      )}
    >
      {visible.map((c) => (
        <Avatar className={sizes[size]} key={ID.unique()}>
          <AvatarImage src={c.avatarURL ?? undefined} alt={c.userName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      {remaining > 0 && (
        <Avatar className={sizes[size]}>
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
}: {
  size: number;
  maxVisible?: number;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
    >
      {[...Array(maxVisible ?? 3)].map((_, i) => (
        <div
          key={i}
          className={`bg-muted rounded-full w-${size} h-${size}animate-pulse`}
        />
      ))}
    </div>
  );
}
