import { type CollaboratorType } from "@/features/collaborators/model/useCollaborators";
import { cn } from "@/shared/lib/css";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { ID } from "appwrite";
import { memo } from "react";

type CollaboratorsAvatarsProps = {
  collaborators: CollaboratorType[];
  size: number;
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

  if (!collaborators) return null;

  // в команде списка всегда как минимум 1 участник (владелец)
  // не показываем соавторов в карточках, если нет других участников
  // но показываем всех, включая владельца, в диалогах и на странице вишлиста
  if (hideOwner && collaborators.length < 2) return null;

  return (
    <div
      className={cn(
        "flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
    >
      {visible.map((c) => (
        <Avatar className={`w-${size} h-${size}`} key={ID.unique()}>
          <AvatarImage src={c.avatarURL} alt={c.userName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}

      {remaining > 0 && (
        <Avatar className={`w-${size} h-${size}`}>
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
