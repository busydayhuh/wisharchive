import useSWR from "swr";
import team from "../teams";

async function fetcher({ teamId }: { teamId: string }) {
  const response = await team.listMembers(teamId);

  return response.memberships;
}

export function useTeamMembers(wishlistId: string) {
  const { data: members } = useSWR(wishlistId, fetcher);

  return { members };
}
