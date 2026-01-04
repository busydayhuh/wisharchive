import { useLinkParams } from "@/features/breadcrumbs/";
import { useUser } from "@/features/profile";
import { ROUTES } from "@/shared/config/routes";
import type { WishDocumentType } from "@/shared/types";
import { href, useNavigate } from "react-router-dom";

export function useWishNavigation(wish: WishDocumentType) {
  const navigate = useNavigate();
  const { $id, ownerId, title, wishlist } = wish;
  const { user: owner } = useUser(ownerId);

  const linkParams = useLinkParams("wish", $id, ownerId, {
    userName: owner?.userName,
    userId: owner?.userId,
    wishTitle: title,
    wlTitle: wishlist?.title,
  });

  const onEditWish = () =>
    navigate(href(ROUTES.EDIT, { wishId: $id }), { state: linkParams.state });

  return { linkParams, onEditWish };
}
