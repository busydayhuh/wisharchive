import type { AccessRoles, CollaboratorType } from "@/features/collaborators";
import { useWishlistBase, useWishlistDialog } from "@/features/wishlist";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import type { LinkParams, WishlistDocumentType } from "@/shared/types";
import { useRoles } from "../store/access/useRoles";

export type WishlistcardMeta = {
  linkParams: LinkParams;
  isFavorite: boolean;
  toggleBookmark: (pressed: boolean) => Promise<void>;
  collaborators: CollaboratorType[] | undefined;
  collabsLoading: boolean;
  collabsError?: Error;
  userRoles: AccessRoles;
  onSharedPage: boolean;
  openWishlistEditor: () => void;
};

export function useWishlistcardMeta(
  wishlist: WishlistDocumentType
): WishlistcardMeta {
  const base = useWishlistBase(wishlist);
  const roles = useRoles();

  const { openDialog } = useWishlistDialog();
  const openWishlistEditor = () =>
    openDialog("edit", wishlist, roles, base.collaborators);

  const { page } = useAppLocation();

  return {
    ...base,
    userRoles: roles,
    onSharedPage: page.shared,
    openWishlistEditor,
  };
}
