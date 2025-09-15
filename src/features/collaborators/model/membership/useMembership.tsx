import { Query } from "appwrite";
import { useMemo } from "react";
import useSWR from "swr";
import team from "../../../../shared/model/teams";

async function fetcher(wishlistId: string, userId: string) {
  const response = await team.listMembers(wishlistId, [
    Query.equal("userId", userId),
  ]);

  return response.memberships[0];
}

export function useMembership(wishlistId: string | null, userId: string) {
  const key = useMemo(
    () => (wishlistId ? ["membership", wishlistId, userId] : null),
    [wishlistId, userId]
  );

  const { data: membership } = useSWR(key, ([, wishlistId, userId]) =>
    fetcher(wishlistId, userId)
  );

  return { membership };
}
