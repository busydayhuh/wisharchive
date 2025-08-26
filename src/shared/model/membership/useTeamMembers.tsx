import useSWR from "swr";
import team from "../teams";

async function fetcher({ teamId }: { teamId: string }) {
  const response = await team.listMembers(teamId);

  return response.memberships;
}

export function useTeamMembers(wishlistId: string | null) {
  const {
    data: members,
    isLoading,
    error,
    mutate,
  } = useSWR(wishlistId ? { teamId: wishlistId } : null, fetcher, {
    onSuccess: (memberships) => memberships.reverse(),
  });

  return { members, isLoading, error, mutate };
}
