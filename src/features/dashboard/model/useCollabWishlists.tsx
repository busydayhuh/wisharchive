import { useWishlists } from "@/features/wishlist";
import team from "@/shared/model/teams";
import type { Models } from "appwrite";
import useSWR from "swr";

async function fetcher() {
  const response = await team.list();

  return response.teams as Models.Team<Models.Preferences>[];
}

export function useCollabWishlists(
  userId: string | null,
  searchString?: string
) {
  const {
    data: teams,
    isLoading: teamsLoading,
    error: teamsError,
  } = useSWR("currentUserTeams", fetcher);

  const teamsIds = teams?.map((t) => t.$id) ?? [];

  const {
    wishlists,
    isLoading: wlLoading,
    error: wlError,
  } = useWishlists(userId, searchString, teamsIds);

  return {
    wishlists,
    isLoading: teamsLoading || wlLoading,
    error: teamsError || wlError,
  };
}
