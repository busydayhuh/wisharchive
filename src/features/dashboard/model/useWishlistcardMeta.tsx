import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import { useDashboardCollaborators } from "@/features/collaborators";
import { useBookmark, useWishlistDialog } from "@/features/wishlist";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams, WishlistDocumentType } from "@/shared/model/types";
import { useCallback } from "react";
import { href, useMatch } from "react-router";
import { useAccess } from "./useAccess";

export function useWishlistcardMeta(wishlist: WishlistDocumentType) {
  const { editorsIds, readersIds, bookmarkedBy, ownerId, $id, owner, title } =
    wishlist;

  const { userId } = useAuth();
  const { location, params } = useRoute();
  const { collaborators } = useDashboardCollaborators(
    ownerId,
    editorsIds,
    readersIds
  );
  const { roles } = useAccess("wishlist", wishlist);
  const { openDialog } = useWishlistDialog();

  const openWishlistEditor = useCallback(
    () => openDialog("edit", wishlist, roles),
    [wishlist, openDialog, roles]
  );
  const { toggleBookmark } = useBookmark($id, bookmarkedBy ?? [], userId);
  const isFavorite = userId ? bookmarkedBy?.includes(userId) ?? false : false;
  const onSharedPage = useMatch(ROUTES.SHARED);

  const linkParams: LinkParams = {
    to: href(ROUTES.WISHLIST, { listId: $id, userId: ownerId }),
    state: {
      prevLocation: location.pathname,
      prevParams: params,
      data: { userName: owner.userName, userId: owner.userId, wlTitle: title },
    },
  };

  return {
    collaborators,
    bookmarkWishlist: toggleBookmark,
    userRoles: roles,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
    linkParams,
  };
}
