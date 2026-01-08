import type {
  Page,
  QueryFilters as WishlistFilters,
} from "@/features/wishlist/model";
import { useWishlists } from "@/features/wishlist/model";
import team from "@/shared/api/teams";
import type { Models } from "appwrite";
import useSWR from "swr";

async function fetcher() {
  const response = await team.list();
  return response.teams as Models.Team<Models.Preferences>[];
}

export function useCollabWishlists(
  filters: WishlistFilters,
  page?: Page,
  userId?: string
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
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useWishlists({ ...filters, teams: teamsIds }, page, userId);

  return {
    wishlists,
    isLoading: teamsLoading || wlLoading,
    error: teamsError || wlError,
    size,
    setSize,
    isValidating,
    reachedEnd,
  };
}
