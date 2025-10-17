import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import { resolveVisibility, resolveWishRoles } from "@/features/collaborators";
import { useWishQuickActions } from "@/features/wish";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams, WishDocumentType } from "@/shared/model/types";
import { useMemo } from "react";
import { href, useMatch } from "react-router-dom";

export function useWishcardMeta({
  wishlist,
  ownerId,
  owner,
  title,
  bookerId,
  $id,
}: Pick<
  WishDocumentType,
  "ownerId" | "bookerId" | "$id" | "wishlist" | "owner" | "title"
>) {
  const { current: authUser } = useAuth();
  const { location, params } = useRoute();

  const roles = useMemo(
    () => resolveWishRoles(wishlist, ownerId, bookerId, authUser?.$id),
    [wishlist, ownerId, bookerId, authUser?.$id]
  );
  const quickActions = useWishQuickActions($id);

  const hasAccess = useMemo(() => {
    return resolveVisibility(
      wishlist?.isPrivate ?? false,
      authUser?.$id,
      roles
    );
  }, [authUser?.$id, roles, wishlist?.isPrivate]);

  const onBookedPage = useMatch(ROUTES.BOOKED);
  const onListPage = useMatch(ROUTES.WISHLIST);

  const linkParams: LinkParams = {
    to: href(ROUTES.WISH, { wishId: $id, userId: ownerId }),
    state: {
      prevLocation: location.pathname,
      prevParams: params,
      data: {
        userName: owner.userName,
        wishTitle: title,
        wlTitle: wishlist?.title,
      },
    },
  };

  return {
    userRoles: roles,
    quickActions,
    onBookedPage,
    onListPage,
    hasAccess,
    linkParams,
  };
}
