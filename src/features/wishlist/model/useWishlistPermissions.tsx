import { useCollaborators } from "@/features/collaborators";

export function useWishlistPermissions(
  userId: string,
  wishlistId: string | null
) {
  const { collaborators } = useCollaborators(wishlistId);
  const collaborator = collaborators?.find((c) => c.userId === userId);

  return {
    isOwner: collaborator?.roles?.includes("owner") ?? false,
    isReader: collaborator?.roles?.includes("readers") ?? false,
    isEditor: collaborator?.roles?.includes("editors") ?? false,

    // поля для проверки в useWishPermissions
    hasWishlist: Boolean(wishlistId),
  };
}
