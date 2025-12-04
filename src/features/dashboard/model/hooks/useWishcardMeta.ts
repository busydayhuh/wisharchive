import { useRoute } from "@/features/breadcrumbs";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams, WishDocumentType } from "@/shared/model/types";
import { href, useMatch, useNavigate } from "react-router-dom";

export function useWishcardMeta({
  wishlist,
  ownerId,
  owner,
  title,
  $id,
}: Pick<WishDocumentType, "ownerId" | "$id" | "wishlist" | "owner" | "title">) {
  const { location, params } = useRoute();
  const navigate = useNavigate();

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
    onBookedPage,
    onListPage,
    linkParams,
    onEditWish,
  };
}
