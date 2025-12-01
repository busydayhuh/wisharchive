import type { WishRoles } from "@/features/collaborators";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { WishlistBadge } from "@/shared/ui/Badges";
import { useMatch } from "react-router";
import useWishlistControls from "../model/useWishlistControls";
import { WishlistChanger } from "./WishlistChanger";
import WishlistRemoveButton from "./WishlistRemoveButton";

type WishlistControlsProps = {
  wish: WishDocumentType;
  roles: WishRoles;
  wishlist: WishlistDocumentType | null;
  className?: string;
  variant?: "gallery" | "table";
};

export function WishlistControls({
  wish,
  roles,
  wishlist,
  className,
  variant = "gallery",
}: WishlistControlsProps) {
  const { move, remove } = useWishlistControls(wish, roles);
  const onListPage = useMatch(ROUTES.WISHLIST);
  const isMobile = useIsMobile();

  // кнопка смены wl [дашборд]
  if (roles.isWishOwner && !onListPage) {
    if (isMobile && variant === "gallery") return null;
    return (
      <WishlistChanger
        selectedValue={wishlist?.$id ?? "none"}
        onSelect={move}
        className={className}
      />
    );
  }
  // убрать из wl [страница вишлиста]
  if ((roles.isEditor || roles.isWishlistOwner) && onListPage)
    return (
      <WishlistRemoveButton
        onRemove={remove}
        variant={variant}
        className={className}
      />
    );
  // бейдж с wl [для гостей]
  if (wishlist && !onListPage)
    return (
      <WishlistBadge
        id={wishlist.$id}
        title={wishlist.title}
        className={className}
        isPrivate={wishlist.isPrivate}
        ownerId={wishlist.ownerId}
      />
    );

  return null;
}
