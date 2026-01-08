import { useAuth } from "@/features/auth";
import type { Models } from "appwrite";
import { useMemo } from "react";
import {
  resolveWishRoles,
  resolveWishlistRoles,
} from "../resolveDocumentRoles";
import { resolveVisibility } from "../resolveVisibility";
import type { AccessRoles } from "../types";

export function useAccess(type: "wish" | "wishlist", item?: Models.Document) {
  const { userId } = useAuth();

  const roles = useMemo<AccessRoles | undefined>(() => {
    if (!item) return undefined;
    return type === "wish"
      ? resolveWishRoles(item.wishlist, item.ownerId, item.bookerId, userId)
      : resolveWishlistRoles(
          item.editorsIds,
          item.readersIds,
          item.ownerId,
          userId
        );
  }, [item, userId, type]);

  const hasAccess = useMemo(() => {
    if (!item) return false;
    return resolveVisibility(
      item.isPrivate || item.wishlist?.isPrivate,
      userId,
      roles
    );
  }, [userId, roles, item]);

  return { roles, hasAccess };
}
