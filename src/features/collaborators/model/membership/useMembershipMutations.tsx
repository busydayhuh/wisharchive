import { useWishlistMutations } from "@/features/wishlist/";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import team from "../../../../shared/model/teams";
import { useTeamMembers } from "./useTeamMembers";

function useMembershipMutations(teamId: string) {
  const { members, mutate } = useTeamMembers(teamId);
  const { update } = useWishlistMutations();

  const editors = useMemo(
    () => members?.filter((m) => m.roles.includes("editors")),
    [members]
  );
  const readers = useMemo(
    () => members?.filter((m) => m.roles.includes("readers")),
    [members]
  );

  const addMemberAsEditor = useCallback(
    async (email: string, userId: string) => {
      try {
        const response = await team.addEditor(teamId, email, userId);

        await update(teamId, {
          editorsIds: [...(editors?.map((m) => m.userId) ?? []), userId],
        });

        mutate();
        toast.success("Приглашение отправлено");

        return response;
      } catch {
        toast.error("Не удалось пригласить пользователя", {
          description: "Повторите попытку позже",
        });
      }
    },
    [editors, update, teamId, mutate]
  );

  const addMemberAsReader = useCallback(
    async (email: string, userId: string) => {
      try {
        const response = await team.addReader(teamId, email, userId);

        await update(teamId, {
          readersIds: [...(readers?.map((m) => m.userId) ?? []), userId],
        });

        mutate();
        toast.success("Приглашение отправлено");

        return response;
      } catch {
        toast.error("Не удалось пригласить пользователя", {
          description: "Повторите попытку позже",
        });
      }
    },
    [mutate, readers, teamId, update]
  );

  const deleteMember = useCallback(
    async (userId: string) => {
      const membership = members?.find(
        ({ userId: memberId }) => memberId === userId
      );
      const membershipId = membership?.$id ?? "";

      try {
        await team.deleteMembership(teamId, membershipId);

        await update(teamId, {
          editorsIds: editors?.filter((m) => m.userId !== userId),
          readersIds: readers?.filter((m) => m.userId !== userId),
        });

        mutate();
        toast.success("Пользователь удален из команды");
      } catch {
        toast.error("Не удалось удалить пользователя", {
          description: "Повторите попытку позже",
        });
      }
    },
    [editors, members, mutate, update, readers, teamId]
  );

  return { addMemberAsEditor, addMemberAsReader, deleteMember };
}

export default useMembershipMutations;
