import { useWishlistMutations } from "@/features/wishlist/";
import { handleError } from "@/shared/model/handleError";
import { useCallback, useMemo } from "react";
import team from "../../../../shared/model/teams";
import { useTeamMembers } from "./useTeamMembers";

function useMembershipMutations(teamId: string) {
  const { members, mutate } = useTeamMembers(teamId);
  const { update } = useWishlistMutations();

  const editors = useMemo(
    () =>
      members?.filter((m) => m.roles.includes("editors")).map((e) => e.userId),
    [members]
  );
  const readers = useMemo(
    () =>
      members?.filter((m) => m.roles.includes("readers")).map((r) => r.userId),
    [members]
  );

  const addMember = useCallback(
    async (email: string, userId: string, role: "editors" | "readers") => {
      try {
        // Добавляем члена в Team API
        if (role === "editors") await team.addEditor(teamId, email, userId);
        if (role === "readers") await team.addReader(teamId, email, userId);

        // Обновляем список в БД
        const { ok, errorMessage } = await update(teamId, {
          editorsIds:
            role === "editors" ? [...(editors ?? []), userId] : editors,
          readersIds:
            role === "readers" ? [...(readers ?? []), userId] : readers,
        });
        if (!ok) throw new Error(errorMessage);

        mutate();

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    [editors, mutate, readers, teamId, update]
  );

  const deleteMember = useCallback(
    async (userId: string) => {
      const membership = members?.find(
        ({ userId: memberId }) => memberId === userId
      );
      const membershipId = membership?.$id ?? "";

      try {
        // удаляем членство в Team API
        await team.deleteMembership(teamId, membershipId);
        // редактируем список редакторов и читателей вишлиста в БД
        const { ok } = await update(teamId, {
          editorsIds: editors?.filter((e) => e !== userId),
          readersIds: readers?.filter((r) => r !== userId),
        });
        if (!ok) throw Error;

        mutate();

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    [editors, members, mutate, update, readers, teamId]
  );

  return { deleteMember, addMember };
}

export default useMembershipMutations;
