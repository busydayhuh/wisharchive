import db from "@/shared/model/databases";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetcher({ queries }: { collection: string; queries: string[] }) {
  const response = await db.wishlists.list(queries);

  return response.documents as WishlistDocumentType[];
}

export function useFetchWishlists(
  userId = "",
  path = "/lists/:userId",
  searchString = ""
) {
  const validatedPath = path.includes("/lists") ? "/lists/:userId" : path;

  const FILTERS_FOR_PATHS = {
    [ROUTES.WISHLISTS]: [Query.equal("ownerId", userId)],
    [ROUTES.BOOKMARKS]: [Query.contains("bookmarkedBy", userId)],
    [ROUTES.SHARED]: [Query.contains("canRead", userId)],
  };

  const {
    data: wishlists,
    isLoading,
    error,
    mutate,
  } = useSWR(
    {
      queries: FILTERS_FOR_PATHS[
        validatedPath as keyof typeof FILTERS_FOR_PATHS
      ].concat([Query.contains("title", searchString)]),
    },
    fetcher,
    {
      onSuccess: (data) => {
        data.reverse();
        data.forEach((wl) => (wl.wishes ? wl.wishes.reverse() : null));
      },
    }
  );

  return { wishlists, isLoading, error, mutate };
}
