import type { WishlistDocumentType } from "@/shared/types";
import type { Roles, WishRoles } from "./types";

export function resolveWishlistRoles(
  editorsIds: string[] = [],
  readersIds: string[] = [],
  ownerId: string,
  userId?: string
): Roles | undefined {
  if (!userId) return;
  return {
    isWishlistOwner: ownerId === userId,
    isReader: readersIds.includes(userId),
    isEditor: editorsIds.includes(userId),
  };
}

export function resolveWishRoles(
  wishlist: WishlistDocumentType | null,
  ownerId: string,
  bookerId: string | null,
  userId?: string
): WishRoles | undefined {
  if (!userId) return;
  let teamRoles: Roles;

  if (!wishlist) {
    // если списка нет, задаем дефолт
    teamRoles = {
      isWishlistOwner: false,
      isReader: true, // дефолтно читают все
      isEditor: ownerId === userId, // редактирует только владелец
    };
  } else {
    const resolved = resolveWishlistRoles(
      wishlist.editorsIds,
      wishlist.readersIds,
      wishlist.ownerId,
      userId
    );
    if (!resolved) return;
    teamRoles = resolved;
  }

  const localRoles = {
    isWishOwner: userId === ownerId,
    isBooker: userId === bookerId,
  };
  return { ...teamRoles, ...localRoles };
}
