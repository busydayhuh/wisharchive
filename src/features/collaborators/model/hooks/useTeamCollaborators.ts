import { useUsers } from "@/shared/hooks/user/useUsers";
import { useMemo } from "react";
import type { CollaboratorType } from "../types";
import { useTeamMembers } from "./useTeamMembers";

export function useTeamCollaborators(wishlistId: string | null) {
  const {
    members,
    isLoading: membersLoading,
    error: membersError,
  } = useTeamMembers(wishlistId);

  const memberIds = members?.map((m) => m.userId) ?? [];

  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers(memberIds);

  const { collaborators, collaboratorsById } = useMemo(() => {
    if (!users || !members)
      return { collaborators: undefined, collaboratorsById: new Map() };

    const roleMap = new Map(members.map((m) => [m.userId, m.roles]));
    const confirmMap = new Map(members.map((m) => [m.userId, m.confirm]));

    const collaborators: CollaboratorType[] = users.map((user) => ({
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      avatarURL: user.avatarURL,
      roles: roleMap.get(user.userId),
      confirm: confirmMap.get(user.userId),
    }));

    const collaboratorsById = new Map(collaborators.map((c) => [c.userId, c]));

    return { collaborators, collaboratorsById };
  }, [users, members]);

  return {
    collaborators,
    collaboratorsById,
    isLoading: membersLoading || usersLoading,
    error: membersError || usersError,
  };
}
