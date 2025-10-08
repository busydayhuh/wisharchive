import { useAuth } from "@/features/auth";
import { resolveVisibility, resolveWishRoles } from "@/features/collaborators";
import { useWishQuickActions } from "@/features/wish";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { useMemo } from "react";
import { useMatch } from "react-router-dom";

export function useWishcardMeta({
  wishlist,
  ownerId,
  bookerId,
  $id,
}: Pick<WishDocumentType, "ownerId" | "bookerId" | "$id" | "wishlist">) {
  const { current: authUser } = useAuth();

  const roles = useMemo(
    () => resolveWishRoles(wishlist, ownerId, bookerId, authUser?.$id),
    [wishlist, ownerId, bookerId, authUser?.$id]
  );
  const quickActions = useWishQuickActions($id);

  const hasAccess = useMemo(() => {
    return resolveVisibility(
      wishlist?.isPrivate ?? false,
      authUser?.$id,
      roles
    );
  }, [authUser?.$id, roles, wishlist?.isPrivate]);

  const onBookedPage = useMatch(ROUTES.BOOKED);
  const onListPage = useMatch(ROUTES.WISHLIST);

  return {
    userRoles: roles,
    quickActions,
    onBookedPage,
    onListPage,
    hasAccess,
  };
}
