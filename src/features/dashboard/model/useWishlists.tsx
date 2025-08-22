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
  const { pathname } = useLocation();
  const queries = getWishlistQueries(
    pathname,
    userId,
    searchString ?? "",
    teams
  );

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
        data.forEach((wl) => (wl.wishes ? wl.wishes.reverse() : null));
      },
    }
  );

  return { wishlists, isLoading, error, mutate };
}

function getWishlistQueries(
  pathname: string,
  userId: string,
  searchString: string,
  teams?: string[]
) {
  if (pathname.includes("/lists")) {
    return [
      Query.equal("ownerId", userId),
      Query.contains("title", searchString),
      Query.orderDesc("$sequence"),
    ];
  }

  if (pathname.includes("/bookmarks")) {
    return [
      Query.contains("bookmarkedBy", userId),
      Query.contains("title", searchString),
      Query.orderDesc("$sequence"),
    ];
  }

  // team каждого вишлиста имеет такой же id, как и вишлист
  // поэтому ищем вишлисты по массиву id teams

  if (pathname.includes("/shared")) {
    return [
      Query.equal("$id", teams ?? ""),
      Query.notEqual("ownerId", userId),
      Query.contains("title", searchString),
      Query.orderDesc("$sequence"),
    ];
  }
}
