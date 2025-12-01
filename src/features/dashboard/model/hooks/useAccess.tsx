import { useAuth } from "@/features/auth";
import {
  resolveVisibility,
  resolveWishRoles,
  resolveWishlistRoles,
} from "@/features/collaborators";
import type { Models } from "appwrite";
import { useMemo } from "react";

export function useAccess(type: "wish" | "wishlist", item: Models.Document) {
  const { userId } = useAuth();

  const roles = useMemo(
    () =>
      type === "wish"
        ? resolveWishRoles(item.wishlist, item.ownerId, item.bookerId, userId)
        : resolveWishlistRoles(
            item.editorsIds,
            item.readersIds,
            item.ownerId,
            userId
          ),
    [item, userId, type]
  );

  const hasAccess = useMemo(() => {
    return resolveVisibility(
      item.isPrivate || item.wishlist?.isPrivate,
      userId,
      roles
    );
  }, [userId, roles, item]);

  return { roles, hasAccess };
}
