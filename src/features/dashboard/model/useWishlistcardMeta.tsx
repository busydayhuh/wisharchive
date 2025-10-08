import { useAuth } from "@/features/auth";
import {
  resolveWishlistRoles,
  useDashboardCollaborators,
} from "@/features/collaborators";
import { toggleBookmark, useWishlistDialog } from "@/features/wishlist";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { useCallback } from "react";
import { useMatch } from "react-router";

export function useWishlistcardMeta(wishlist: WishlistDocumentType) {
  const { editorsIds, readersIds, bookmarkedBy, ownerId, $id } = wishlist;

  const { current: authUser } = useAuth();
  const { collaborators } = useDashboardCollaborators(editorsIds, readersIds);

  const { openDialog } = useWishlistDialog();
  const openWishlistEditor = useCallback(
    () => openDialog("edit", wishlist),
    [wishlist, openDialog]
  );

  const isFavorite =
    (!!authUser?.$id && bookmarkedBy?.includes(authUser.$id)) ?? false;
  const bookmarkWishlist = (pressed: boolean) =>
    toggleBookmark(pressed, $id, bookmarkedBy ?? [], authUser?.$id);

  const userRoles = resolveWishlistRoles(
    editorsIds,
    readersIds,
    ownerId,
    authUser?.$id
  );

  const onSharedPage = useMatch(ROUTES.SHARED);

  return {
    collaborators,
    bookmarkWishlist,
    userRoles,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
  };
}
