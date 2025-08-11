import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import { useLocation } from "react-router";
import useSWR from "swr";

async function fetcher({ queries }: { queries: string[] }) {
  const response = await db.wishlists.list(queries);

  return response.documents as WishlistDocumentType[];
}

export function useWishlists(
  userId: string,
  searchString?: string,
  teams?: string[]
) {
  const path = useLocation().pathname;
  const queries = getWishlistQueries(path, userId, searchString ?? "", teams);

  const {
    data: wishlists,
    isLoading,
    error,
    mutate,
  } = useSWR(
    {
      queries: queries,
      userId: userId,
      searchString: searchString,
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

function getWishlistQueries(
  path: string,
  userId: string,
  searchString: string,
  teams?: string[]
) {
  if (path.includes("/lists")) {
    return [
      Query.equal("ownerId", userId),
      Query.contains("title", searchString),
    ];
  }

  if (path.includes("/bookmarks")) {
    return [
      Query.contains("bookmarkedBy", userId),
      Query.contains("title", searchString),
    ];
  }

  // team каждого вишлиста имеет такой же id, как и вишлист
  // поэтому ищем вишлисты по массиву id teams

  if (path.includes("/shared")) {
    return [
      Query.equal("$id", teams ?? ""),
      Query.contains("title", searchString),
    ];
  }
}
