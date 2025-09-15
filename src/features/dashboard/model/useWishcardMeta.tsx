import { useAuth } from "@/features/auth";
import { useWishPermissions, useWishQuickActions } from "@/features/wish";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
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

  const { toggleBookingStatus, archiveWish, deleteWish } = useWishQuickActions(
    wish.$id
  );
  const onBookedPage = pathname.includes("/booked");
  const editWish = () => navigate(href(ROUTES.EDIT, { wishId: wish.$id }));

  return {
    isOwner,
    isBooker,
    isEditor,
    toggleBookingStatus,
    onBookedPage,
    archiveWish,
    deleteWish,
    editWish,
  };
}
