import type { AccessRoles } from "@/features/collaborators";
import { ROUTES } from "@/shared/config/routes";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import type { WishDocumentType, WishlistDocumentType } from "@/shared/types";
import { WishlistBadge } from "@/shared/ui/components/Badges";
import { useMatch } from "react-router-dom";
import useWishlistControls from "../model/useWishlistControls";
import { WishlistChanger } from "./WishlistChanger";
import WishlistRemoveButton from "./WishlistRemoveButton";

type WishlistControlsProps = {
  wish: WishDocumentType;
  roles?: AccessRoles;
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
  if (roles?.isWishOwner && !onListPage) {
    if (isMobile && variant === "gallery")
      return (
        <>
          {wishlist ? (
            <WishlistBadge
              id={wishlist.$id}
              title={wishlist.title}
              className={className}
              isPrivate={wishlist.isPrivate}
              ownerId={wishlist.ownerId}
            />
          ) : null}
        </>
      );

    return (
      <WishlistChanger
        selectedValue={wishlist?.$id ?? "none"}
        onSelect={move}
        className={className}
      />
    );
  }
  // убрать из wl [страница вишлиста]
  if (
    (roles?.isEditor || roles?.isWishlistOwner || roles?.isWishOwner) &&
    onListPage
  )
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
