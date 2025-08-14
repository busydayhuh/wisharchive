import { useTeamMembers } from "@/shared/model/membership/useTeamMembers";
import type { WishlistDocumentType } from "@/shared/model/types";

export function useWishlistRoles(
  userId: string,
  wishlist: WishlistDocumentType | null
) {
  const { members } = useTeamMembers(wishlist?.$id ?? "");
  const membership =
    members?.find((member) => member.userId === userId) ?? null;

  return {
    isOwner: wishlist?.ownerId === userId,
    isReader: membership?.roles.includes("readers") ?? false,
    isEditor: membership?.roles.includes("editors") ?? false,
    isFavorite: wishlist?.bookmarkedBy.includes(userId) ?? false,

    hasWishlist: Boolean(wishlist), // поле для проверки в useWishRoles
  };
}
