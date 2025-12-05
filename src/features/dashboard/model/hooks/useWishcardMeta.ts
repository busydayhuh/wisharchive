import { useWishNavigation } from "@/features/wish";
import { useAppLocation } from "@/shared/lib/react/useAppLocation";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { WishDocumentType } from "@/shared/model/types";
import { useRoles } from "../store/access/useRoles";

export function useWishcardMeta(wish: WishDocumentType) {
  const { linkParams, onEditWish } = useWishNavigation(wish);
  const userRoles = useRoles();
  const { page } = useAppLocation();
  const showOwner = page.list || page.booked;
  const isMobile = useIsMobile();

  return {
    linkParams,
    onEditWish,
    showOwner,
    onListPage: page.list,
    onBookedPage: page.booked,
    userRoles,
    isMobile,
  };
}
