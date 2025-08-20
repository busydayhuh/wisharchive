import team from "../teams";
import { useTeamMembers } from "./useTeamMembers";

function useMembershipMutations(teamId: string) {
  const { mutate } = useTeamMembers(teamId);

  async function addMemberAsEditor(
    teamId: string,
    email: string,
    userId: string
  ) {
    try {
      const response = await team.addEditor(teamId, email, userId);
      mutate();
      return response;
    } catch {
      alert("Не удалось добавить пользователя");
    }
  }
  return { addMemberAsEditor };
}

export default useMembershipMutations;
