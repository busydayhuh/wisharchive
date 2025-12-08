import team from "@/shared/api/teams";
import { useMemo } from "react";
import useSWR from "swr";

async function fetcher(teamId: string, membershipId: string) {
  const response = await team.getMember(teamId, membershipId);

  return response;
}

export function useMembership(teamId?: string, membershipId?: string) {
  const key = useMemo(
    () =>
      membershipId && teamId ? ["membership", teamId, membershipId] : null,
    [membershipId, teamId]
  );

  const { data: membership } = useSWR(key, ([, teamId, membershipId]) =>
    fetcher(teamId, membershipId)
  );

  return { membership };
}
