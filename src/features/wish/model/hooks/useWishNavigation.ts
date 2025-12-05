import { useLinkParams } from "@/features/breadcrumbs/";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { href, useNavigate } from "react-router-dom";

export function useWishNavigation(wish: WishDocumentType) {
  const navigate = useNavigate();
  const { $id, ownerId, owner, title, wishlist } = wish;

  const linkParams = useLinkParams("wish", $id, ownerId, {
    userName: owner.userName,
    userId: owner.userId,
    wishTitle: title,
    wlTitle: wishlist?.title,
  });

  const onEditWish = () =>
    navigate(href(ROUTES.EDIT, { wishId: $id }), { state: linkParams.state });

  return { linkParams, onEditWish };
}
