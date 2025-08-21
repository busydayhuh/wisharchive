import team from "../teams";
import { useTeamMembers } from "./useTeamMembers";

function useMembershipMutations(teamId: string) {
  const { members, mutate } = useTeamMembers(teamId);

  async function addMemberAsEditor(email: string, userId: string) {
    try {
      const response = await team.addEditor(teamId, email, userId);
      mutate();

      return response;
    } catch {
      alert("Не удалось добавить пользователя");
    }
  }

  async function addMemberAsReader(email: string, userId: string) {
    try {
      const response = await team.addReader(teamId, email, userId);
      mutate();

      return response;
    } catch {
      alert("Не удалось добавить пользователя");
    }
  }

  async function deleteMember(userId: string) {
    const membership = members?.find(
      ({ userId: memberId }) => memberId === userId
    );
    const membershipId = membership?.$id ?? "";

    try {
      await team.deleteMembership(teamId, membershipId);
      mutate();
    } catch {
      alert("Не удалось добавить пользователя");
    }
  }

  return { addMemberAsEditor, addMemberAsReader, deleteMember };
}

export default useMembershipMutations;
