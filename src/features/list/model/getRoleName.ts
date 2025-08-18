import type { WishlistRolesType } from "./useWishlistRoles";

export function getRoleName(roles: WishlistRolesType, isPrivate: boolean) {
  if (roles.isOwner) return "Владелец";
  if (roles.isEditor) return "Редактор";
  if (isPrivate && roles.isReader) return "Читатель";

  return null;
}
