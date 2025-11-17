import { useAuth } from "@/features/auth";
import {
  resolveVisibility,
  resolveWishRoles,
  resolveWishlistRoles,
} from "@/features/collaborators";
import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { useMemo } from "react";

export function useAccess(
  type: "wish" | "wishlist",
  item: WishDocumentType | WishlistDocumentType
) {
  const { current: authUser } = useAuth();

  const roles = useMemo(
    () =>
      type === "wish"
        ? resolveWishRoles(
            item.wishlist,
            item.ownerId,
            item.bookerId,
            authUser?.$id
          )
        : resolveWishlistRoles(
            item.editorsIds,
            item.readersIds,
            item.ownerId,
            authUser?.$id
          ),
    [item, authUser, type]
  );

  const hasAccess = useMemo(() => {
    return resolveVisibility(
      item.isPrivate || item.wishlist?.isPrivate,
      authUser?.$id,
      roles
    );
  }, [authUser, roles, item]);

  return { roles, hasAccess };
}
