import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { RoleBadge } from "@/shared/ui/components/Badges";
import { AVATAR_SIZES, UserAvatar } from "@/shared/ui/components/UserAvatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/kit/hover-card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/ui/kit/item";
import { Popover, PopoverContent } from "@/shared/ui/kit/popover";
import { cn } from "@/shared/utils/css";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Frown } from "lucide-react";
import { memo } from "react";
import type { CollaboratorType } from "../model/types";

type CollaboratorsAvatarsProps = {
  collaborators?: CollaboratorType[];
  isLoading?: boolean;
  error?: Error;
  size: "md" | "sm" | "lg";
  maxVisible: number;
  hideOwner?: boolean;
} & React.ComponentProps<"div">;

const SPACING = {
  md: "-space-x-3",
  lg: "-space-x-4",
  sm: "-space-x-2",
};

export function CollaboratorsGroup(props: CollaboratorsAvatarsProps) {
  const isMobile = useIsMobile();

  const getRoles = (role = "readers") => ({
    isWishlistOwner: role === "owner",
    isEditor: role === "editors",
    isReader: role === "readers",
  });
  const listElements = (
    <div className="flex flex-col gap-2.5 w-full">
      {props.collaborators &&
        props.collaborators.map((c) => (
          <Item className="p-0" size="sm">
            <ItemMedia variant="image">
              <UserAvatar
                size="md"
                avatarURL={c.avatarURL ?? undefined}
                name={c.userName}
                id={c.userId}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="font-semibold">{c.userName}</ItemTitle>
              <ItemDescription>
                <RoleBadge roles={getRoles(c.role)} size="sm" />
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
    </div>
  );

  if (props.size === "sm") return <CollaboratorsAvatars {...props} />;
  if (isMobile)
    return (
      <Popover>
        <PopoverTrigger>
          <CollaboratorsAvatars {...props} />
        </PopoverTrigger>
        <PopoverContent>{listElements}</PopoverContent>
      </Popover>
    );

  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger>
        <CollaboratorsAvatars {...props} />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">{listElements}</HoverCardContent>
    </HoverCard>
  );
}

const CollaboratorsAvatars = memo(function CollaboratorsAvatars({
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

  if (error)
    return (
      <p className="inline-flex gap-1 text-muted-foreground text-xs">
        <Frown className="stroke-1 size-4" /> Ошибка
      </p>
    );

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
          "flex *:border-2 *:border-background",
          SPACING[size],
          className
        )}
      >
        {visible.map((c) => (
          <UserAvatar
            size={size}
            avatarURL={c.avatarURL ?? undefined}
            name={c.userName}
            id={c.userId}
            key={c.userId}
          />
        ))}

        {remaining > 0 && (
          <UserAvatar
            size={size}
            name="remaining"
            id="remaining"
            className="text-xs"
            fallbackText={`+${remaining}`}
          />
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
          className={cn(
            "bg-muted rounded-full animate-pulse",
            AVATAR_SIZES[size]
          )}
        />
      ))}
    </div>
  );
}
