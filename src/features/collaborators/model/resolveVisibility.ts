import type { WishRoles } from "./types";

export function resolveVisibility(
  isPrivate: boolean,
  currentUserId?: string,
  roles?: Partial<WishRoles>
) {
  if (!isPrivate) return true; // желания в открытых списках и без списка показываем всегда
  if (!currentUserId && isPrivate) return false; // никогда не показываем приватные желания не авторизованным пользователям
  if (currentUserId && (roles?.isWishOwner || roles?.isWishlistOwner))
    return true; // владельцу списка и владельцу желания показываем желание всегда
  if (currentUserId && isPrivate)
    return Object.values(roles ?? []).some((v) => v); // авторизованному пользователю показываем желание, если он имеет какую-то роль на уровне списка, где оно хранится
  return true; // по умолчанию видно
}
