import { useAuth } from "@/features/auth";
import {
  resolveVisibility,
  resolveWishlistRoles,
  resolveWishRoles,
} from "@/features/collaborators";
import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { useMemo } from "react";

export function AccessWrapper({
  type,
  item,
  children,
}: {
  type: "wish" | "wishlist";
  item: WishDocumentType | WishlistDocumentType;
  children: React.ReactNode;
}) {
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

  if (!hasAccess) return null;

  return <div>{children}</div>;
}
