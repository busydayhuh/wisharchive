import { useAuth } from "@/features/auth";
import { useWishPermissions, useWishQuickActions } from "@/features/wish";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { useCallback } from "react";
import { href, useLocation, useNavigate } from "react-router";

export function useWishcardMeta(wish: WishDocumentType) {
  const { current: authUser } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isOwner, isBooker, isEditor } = useWishPermissions(
    authUser?.$id ?? "",
    wish.wishlistId ?? null,
    wish.ownerId,
    wish.bookerId
  );

  const onBookedPage = pathname.includes("/booked");
  const onListPage = pathname.includes("list");

  const { bookWish, archiveWish, deleteWish } = useWishQuickActions(wish.$id);
  const editWish = useCallback(
    () => navigate(href(ROUTES.EDIT, { wishId: wish.$id })),
    [navigate, wish]
  );

  return {
    isOwner,
    isBooker,
    isEditor,
    bookWish,
    onBookedPage,
    archiveWish,
    deleteWish,
    editWish,
    onListPage,
  };
}
