import { useWishlistRoles } from "@/features/wishlist";

export type WishRolesType = {
  isOwner: boolean;
  isBooker: boolean;
  isReader: boolean;
  isEditor: boolean;
  hasWishlist?: boolean;
};

export function useWishRoles(
  userId: string,
  wishlistId?: string | null,
  ownerId?: string | null,
  bookerId?: string | null
) {
  const wishlistRoles = useWishlistRoles(userId, wishlistId ?? null);

  if (wishlistRoles.hasWishlist) {
    return {
      ...wishlistRoles,
      isOwner: ownerId === userId,
      isBooker: bookerId === userId,
    };
  }

  return {
    isOwner: ownerId === userId,
    isReader: true,
    isEditor: ownerId === userId,
    isBooker: bookerId === userId,
  };
}
