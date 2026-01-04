import { useUsers } from "@/features/profile";
import type { CollaboratorType } from "../types";

// Облегченный хук для дашборда, который не вызывает Team API для каждого вишлиста, а использует дублирующие состав Team поля в вишлисте
export function useDocumentCollaborators(
  ownerId: string,
  editorsIds: string[],
  readersIds: string[]
) {
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers([...editorsIds, ...readersIds, ownerId]);

  if (!users)
    return {
      collaborators: undefined,
      collaboratorsById: new Map(),
      isLoading: usersLoading,
      error: usersError,
    };

  const editorsMap = new Map(editorsIds.map((e) => [e, "editors"]));
  const readersMap = new Map(readersIds.map((e) => [e, "readers"]));
  const rolesMap = new Map([...editorsMap, ...readersMap, [ownerId, "owner"]]);

  const collaborators: CollaboratorType[] = users.map((user) => ({
    userId: user.userId,
    userName: user.userName,
    userEmail: user.userEmail,
    avatarURL: user.avatarURL,
    role: rolesMap.get(user.userId),
  }));

  const collaboratorsById = new Map(collaborators.map((c) => [c.userId, c]));

  return {
    collaborators,
    collaboratorsById,
    isLoading: usersLoading,
    error: usersError,
  };
}
