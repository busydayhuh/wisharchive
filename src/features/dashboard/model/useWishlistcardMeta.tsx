import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import {
  resolveWishlistRoles,
  useDashboardCollaborators,
} from "@/features/collaborators";
import { useToggleBookmark, useWishlistDialog } from "@/features/wishlist";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams, WishlistDocumentType } from "@/shared/model/types";
import { useCallback } from "react";
import { href, useMatch } from "react-router";

export function useWishlistcardMeta(wishlist: WishlistDocumentType) {
  const { editorsIds, readersIds, bookmarkedBy, ownerId, $id, owner, title } =
    wishlist;

  const { current: authUser } = useAuth();
  const { location, params } = useRoute();
  const { collaborators } = useDashboardCollaborators(
    ownerId,
    editorsIds,
    readersIds
  );

  const { openDialog } = useWishlistDialog();
  const openWishlistEditor = useCallback(
    () => openDialog("edit", wishlist),
    [wishlist, openDialog]
  );

  const { toggle } = useToggleBookmark($id, bookmarkedBy ?? [], authUser?.$id);
  const isFavorite =
    (!!authUser?.$id && bookmarkedBy?.includes(authUser.$id)) ?? false;

  const userRoles = resolveWishlistRoles(
    editorsIds,
    readersIds,
    ownerId,
    authUser?.$id
  );

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
    bookmarkWishlist: toggle,
    userRoles,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
    linkParams,
  };
}
