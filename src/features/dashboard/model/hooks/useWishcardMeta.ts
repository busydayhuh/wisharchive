import type { AccessRoles } from "@/features/collaborators";
import { useWishNavigation } from "@/features/wish";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import type { LinkParams, WishDocumentType } from "@/shared/types";
import { useRoles } from "../store/access/useRoles";

export type WishcardMeta = {
  linkParams: LinkParams;
  onEditWish: () => void;
  showOwner: boolean;
  onListPage: boolean;
  onBookedPage: boolean;
  userRoles: AccessRoles;
  isMobile: boolean;
};

export function useWishcardMeta(wish: WishDocumentType): WishcardMeta {
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
