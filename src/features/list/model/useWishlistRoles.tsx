import { useTeamMembers } from "@/shared/model/membership/useTeamMembers";
import { useWishlist } from "./useWishlist";

export type WishlistRolesType = {
  isOwner: boolean;
  isReader: boolean;
  isEditor: boolean;
  isFavorite: boolean;
  hasWishlist: boolean;
  inPrivateWishlist: boolean;
};

export function useWishlistRoles(userId: string, wishlistId?: string | null) {
  const { members } = useTeamMembers(wishlistId ?? "");
  const membership =
    members?.find((member) => member.userId === userId) ?? null;

  const { wishlist } = useWishlist(wishlistId);

  return {
    isOwner: wishlist?.ownerId === userId,
    isReader: membership?.roles.includes("readers") ?? false,
    isEditor: membership?.roles.includes("editors") ?? false,
    isFavorite: wishlist?.bookmarkedBy?.includes(userId) ?? false,

    // поля для проверки в useWishRoles
    hasWishlist: Boolean(wishlistId),
    inPrivateWishlist: wishlist?.isPrivate ?? false,
  };
}
