import { useWishQuickActions, WishlistSelect } from "@/features/wish";
import type { WishlistDocumentType } from "@/shared/model/types";
import { WishlistBadge } from "@/shared/ui/Badges";

export function WishlistChanger({
  isOwner,
  isArchived,
  wishlistId,
  wishlist,
  wishId,
  className,
}: {
  isOwner: boolean;
  isArchived: boolean;
  wishlistId: string | null;
  wishlist: WishlistDocumentType | null;
  wishId: string;
  className?: string;
}) {
  const { changeWishlist } = useWishQuickActions(wishId);

  if (isArchived) return null;

  if (isOwner)
    return (
      <WishlistSelect
        value={wishlistId ?? "none"}
        onValueChange={(newWlId: string) => {
          changeWishlist(newWlId === "none" ? null : newWlId);
        }}
        className={className}
      />
    );

  if (wishlist)
    return (
      <WishlistBadge
        id={wishlist.$id}
        title={wishlist.title}
        className={className}
        isPrivate={wishlist.isPrivate}
      />
    );

  return null;
}
