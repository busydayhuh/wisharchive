import type { AccessRoles, CollaboratorType } from "@/features/collaborators";
import { useWishlistBase, useWishlistDialog } from "@/features/wishlist";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import type {
  LinkParams,
  UserDocumentType,
  WishlistDocumentType,
} from "@/shared/types";
import { useRoles } from "../store/access/useRoles";

export type WishlistcardMeta = {
  linkParams: LinkParams;
  owner?: UserDocumentType;
  isFavorite: boolean;
  toggleBookmark: (pressed: boolean) => Promise<void>;
  collaborators: CollaboratorType[] | undefined;
  collabsLoading: boolean;
  collabsError?: Error;
  userRoles: AccessRoles;
  onSharedPage: boolean;
  inBookmarks: boolean;
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
    inBookmarks: page.bookmarks,
    openWishlistEditor,
  };
}
