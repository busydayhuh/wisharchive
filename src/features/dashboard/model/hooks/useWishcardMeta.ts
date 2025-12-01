import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import { resolveWishRoles } from "@/features/collaborators";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams, WishDocumentType } from "@/shared/model/types";
import { useMemo } from "react";
import { href, useMatch, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const roles = useMemo(
    () => resolveWishRoles(wishlist, ownerId, bookerId, authUser?.$id),
    [wishlist, ownerId, bookerId, authUser?.$id]
  );

  const onBookedPage = useMatch(ROUTES.BOOKED);
  const onListPage = useMatch(ROUTES.WISHLIST);

  const linkParams: LinkParams = {
    to: href(ROUTES.WISH, { wishId: $id, userId: ownerId }),
    state: {
      prevLocation: location.pathname,
      prevParams: params,
      data: {
        userName: owner.userName,
        userId: owner.userId,
        wishTitle: title,
        wlTitle: wishlist?.title,
      },
    },
  };

  const onEditWish = () =>
    navigate(href(ROUTES.EDIT, { wishId: $id }), { state: linkParams.state });

  return {
    userRoles: roles,
    onBookedPage,
    onListPage,
    linkParams,
    onEditWish,
  };
}
