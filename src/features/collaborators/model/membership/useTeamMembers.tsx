import { useMemo } from "react";
import useSWR from "swr";
import team from "../../../../shared/model/teams";

async function fetcher(wishlistId: string) {
  const response = await team.listMembers(wishlistId);

  return response.memberships;
}

export function useTeamMembers(wishlistId: string | null) {
  const key = useMemo(
    () => (wishlistId ? ["teamMemberships", wishlistId] : null),
    [wishlistId]
  );

  const {
    data: members,
    isLoading,
    error,
    mutate,
  } = useSWR(key, ([, wishlistId]) => fetcher(wishlistId));

  return { members, isLoading, error, mutate };
}
