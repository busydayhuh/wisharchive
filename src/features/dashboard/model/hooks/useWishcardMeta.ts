import type { AccessRoles } from "@/features/collaborators/model";
import { useUser } from "@/features/profile";
import { useWishNavigation } from "@/features/wish/model";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import type {
  LinkParams,
  UserDocumentType,
  WishDocumentType,
} from "@/shared/types";
import { useRoles } from "../store/access/useRoles";

export type WishcardMeta = {
  linkParams: LinkParams;
  onEditWish: () => void;
  showOwner: boolean;
  onListPage: boolean;
  onBookedPage: boolean;
  userRoles: AccessRoles;
  isMobile: boolean;
  owner?: UserDocumentType;
};

export function useWishcardMeta(wish: WishDocumentType): WishcardMeta {
  const { linkParams, onEditWish } = useWishNavigation(wish);
  const userRoles = useRoles();
  const { page } = useAppLocation();
  const showOwner = page.list || page.booked;
  const isMobile = useIsMobile();
  const { user: owner } = useUser(wish.ownerId);

  return {
    linkParams,
    onEditWish,
    showOwner,
    onListPage: page.list,
    onBookedPage: page.booked,
    userRoles,
    isMobile,
    owner,
  };
}
