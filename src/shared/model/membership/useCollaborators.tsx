import { useMemo } from "react";
import { useUsers } from "../user/useUsers";
import { useTeamMembers } from "./useTeamMembers";

export type CollaboratorType = {
  userId: string;
  userName: string;
  userEmail: string;
  avatarURL?: string;
  roles?: string[];
};

export function useCollaborators(wishlistId: string) {
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

  const collaborators = useMemo<CollaboratorType[] | undefined>(() => {
    if (!users) return undefined;
    if (!members) return undefined;

    const roleMap = new Map(members.map((m) => [m.userId, m.roles]));

    return users.map((user) => ({
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      avatarURL: user.avatarURL,
      roles: roleMap.get(user.userId),
    }));
  }, [users, members]);

  return {
    collaborators,
    isLoading: membersLoading || usersLoading,
    error: membersError || usersError,
  };
}
