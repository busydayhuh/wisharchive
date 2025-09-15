import { useMemo } from "react";
import { useUsers } from "../../../shared/model/user/useUsers";
import { useTeamMembers } from "./membership/useTeamMembers";

export type CollaboratorType = {
  userId: string;
  userName: string;
  userEmail: string;
  avatarURL: string | null;
  roles?: string[];
  confirm?: boolean;
};

export function useCollaborators(wishlistId: string | null) {
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
    const confirmMap = new Map(members.map((m) => [m.userId, m.confirm]));

    return users.map((user) => ({
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      avatarURL: user.avatarURL,
      roles: roleMap.get(user.userId),
      confirm: confirmMap.get(user.userId),
    }));
  }, [users, members]);

  return {
    collaborators,
    isLoading: membersLoading || usersLoading,
    error: membersError || usersError,
  };
}
