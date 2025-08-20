import { Query } from "appwrite";
import useSWR from "swr";
import team from "../teams";

async function fetcher({ teamId, userId }: { teamId: string; userId: string }) {
  const response = await team.listMembers(teamId, [
    Query.equal("userId", userId),
  ]);

  return response.memberships[0];
}

export function useMembership(wishlistId: string | null, userId: string) {
  const { data: membership } = useSWR(
    wishlistId ? { wishlistId, userId } : null,
    fetcher
  );

  return { membership };
}
