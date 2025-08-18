import { useWishlistRoles } from "@/features/list";
import type { WishDocumentType } from "@/shared/model/types";

export function useWishRoles(userId: string, wish: WishDocumentType) {
  const wishlistRoles = useWishlistRoles(userId, wish.wishlist?.$id ?? null);

  if (wishlistRoles.hasWishlist) {
    return {
      ...wishlistRoles,
      isOwner: wish.ownerId === userId,
      isBooker: wish.bookerId === userId,
    };
  }

  return {
    isOwner: wish.ownerId === userId,
    isReader: wish.isPrivate
      ? wish.$permissions.includes(`read:(user:"${userId}")`)
      : true,
    isEditor: wish.$permissions.includes(`update:(user:"${userId}")`),
    isBooker: wish.bookerId === userId,
  };
}
