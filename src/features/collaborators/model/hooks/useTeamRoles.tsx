import { useTeamCollaborators } from "../hooks/useTeamCollaborators";
import type { Roles } from "../types";

function resolveRoles({
  userId,
  wishlistRoles,
  wishlistId,
  wishOwnerId,
}: {
  userId: string;
  wishlistRoles?: string[];
  wishlistId?: string | null;
  wishOwnerId?: string | null;
}): Roles {
  // желание без вишлиста
  if (!wishlistId || !wishlistRoles) {
    return {
      isWishlistOwner: false,
      isReader: true, // дефолтно читают все
      isEditor: wishOwnerId === userId, // редактирует только владелец
    };
  }

  // желание в вишлисте
  return {
    isWishlistOwner: wishlistRoles.includes("owner"),
    isReader: wishlistRoles.includes("readers"),
    isEditor: wishlistRoles.includes("editors"),
  };
}

export function useWishlistTeamRoles(
  wishlistId: string | null,
  userId?: string
) {
  const { collaboratorsById } = useTeamCollaborators(wishlistId);
  if (!userId) return;

  const collaborator = collaboratorsById.get(userId);

  return resolveRoles({
    userId,
    wishlistId,
    wishlistRoles: collaborator?.roles,
  });
}

export function useWishTeamRoles(
  wishlistId: string | null,
  ownerId: string | null,
  bookerId: string | null,
  userId?: string
) {
  const { collaboratorsById } = useTeamCollaborators(wishlistId);

  if (!userId) return;

  const collaborator = collaboratorsById.get(userId);

  const teamRoles = resolveRoles({
    userId,
    wishlistId,
    wishlistRoles: collaborator?.roles,
    wishOwnerId: ownerId,
  });

  const localRoles = {
    isWishOwner: userId === ownerId,
    isBooker: userId === bookerId,
  };

  return { ...teamRoles, ...localRoles };
}
