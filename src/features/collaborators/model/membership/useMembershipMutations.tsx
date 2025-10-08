import { wishlistMutations } from "@/features/wishlist";
import { useMemo } from "react";
import team from "../../../../shared/model/teams";
import { useTeamMembers } from "./useTeamMembers";

function useMembershipMutations(teamId: string) {
  const { members, mutate } = useTeamMembers(teamId);

  const editors = useMemo(
    () => members?.filter((m) => m.roles.includes("editors")),
    [members]
  );
  const readers = useMemo(
    () => members?.filter((m) => m.roles.includes("readers")),
    [members]
  );

  async function addMemberAsEditor(email: string, userId: string) {
    try {
      const response = await team.addEditor(teamId, email, userId);

      await wishlistMutations.update(teamId, {
        editorsIds: [...(editors?.map((m) => m.userId) ?? []), userId],
      });

      mutate();

      return response;
    } catch {
      alert("Не удалось добавить пользователя");
    }
  }

  async function addMemberAsReader(email: string, userId: string) {
    try {
      const response = await team.addReader(teamId, email, userId);

      await wishlistMutations.update(teamId, {
        readersIds: [...(readers?.map((m) => m.userId) ?? []), userId],
      });

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

      await wishlistMutations.update(teamId, {
        editorsIds: editors?.filter((m) => m.userId !== userId),
        readersIds: readers?.filter((m) => m.userId !== userId),
      });

      mutate();
    } catch {
      alert("Не удалось удалить пользователя");
    }
  }

  return { addMemberAsEditor, addMemberAsReader, deleteMember };
}

export default useMembershipMutations;
