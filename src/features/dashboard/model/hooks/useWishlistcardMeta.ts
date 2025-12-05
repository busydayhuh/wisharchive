import { useWishlistBase, useWishlistDialog } from "@/features/wishlist";
import { useAppLocation } from "@/shared/lib/react/useAppLocation";
import type { WishlistDocumentType } from "@/shared/model/types";
import { useRoles } from "../store/access/useRoles";

export function useWishlistcardMeta(wishlist: WishlistDocumentType) {
  const base = useWishlistBase(wishlist);
  const roles = useRoles();

  const { openDialog } = useWishlistDialog();
  const openWishlistEditor = () => openDialog("edit", wishlist, roles);

  const { page } = useAppLocation();

  return {
    ...base,
    userRoles: roles,
    onSharedPage: page.shared,
    openWishlistEditor,
  };
}
