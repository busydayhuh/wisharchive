import { useCollaborators } from "./useCollaborators";

type Permissions = {
  isWishlistOwner: boolean;
  isReader: boolean;
  isEditor: boolean;
};

export function usePermissions({
  wishlistId,
  userId,
}: {
  wishlistId: string | null;
  userId?: string;
}) {
  const { collaborators, isLoading, error } = useCollaborators(wishlistId);

  const collaborator = collaborators?.find((c) => c.userId === userId);

  const userPermissions: Permissions = {
    isWishlistOwner: collaborator?.roles?.includes("owner") ?? false,
    isReader: collaborator?.roles?.includes("readers") ?? false,
    isEditor: collaborator?.roles?.includes("editors") ?? false,
  };

  return { collaborators, isLoading, error, userPermissions };
}
