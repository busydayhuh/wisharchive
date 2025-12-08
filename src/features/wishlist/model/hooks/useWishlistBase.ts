import { useAuth } from "@/features/auth";
import { useLinkParams } from "@/features/breadcrumbs";
import { useDocumentCollaborators } from "@/features/collaborators";
import type { WishlistDocumentType } from "@/shared/types";
import { useBookmark } from "./useBookmark";

export function useWishlistBase(wishlist: WishlistDocumentType) {
  const { $id, ownerId, owner, title, bookmarkedBy } = wishlist;

  const { userId } = useAuth();
  const linkParams = useLinkParams("wishlist", $id, ownerId, {
    userName: owner.userName,
    userId: owner.userId,
    wlTitle: title,
  });

  const {
    collaborators,
    isLoading: collabsLoading,
    error: collabsError,
  } = useDocumentCollaborators(
    wishlist.ownerId,
    wishlist.editorsIds,
    wishlist.readersIds
  );

  const { toggleBookmark } = useBookmark($id, bookmarkedBy ?? [], userId);
  const isFavorite = Boolean(userId && bookmarkedBy?.includes(userId));

  return {
    linkParams,
    isFavorite,
    toggleBookmark,
    collaborators,
    collabsLoading,
    collabsError,
  };
}
