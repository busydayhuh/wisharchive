import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetcher({
  collection,
  queries,
}: {
  collection: string;
  queries: string[];
}) {
  const response = await db[collection].list(queries);

  return response.documents as WishlistDocumentType[];
}

export function useFetchWishlists(
  userId = "",
  searchString = "",
  target: "allLists" | "collaboratingLists" | "bookmarkedLists"
) {
  const queries = {
    allLists: [Query.equal("ownerId", userId)],
    collaboratingLists: [Query.contains("canRead", userId)],
    bookmarkedLists: [Query.contains("bookmarkedBy", userId)],
  };

  const {
    data: wishlists,
    isLoading,
    error,
  } = useSWR(
    {
      userId: userId,
      collection: "wishlists",
      queries: queries[target as keyof typeof queries].concat([
        Query.contains("title", searchString),
      ]),
    },
    fetcher,
    {
      onSuccess: (data) => {
        data.reverse();
        data.forEach((wl) => (wl.wishes ? wl.wishes.reverse() : null));
      },
    }
  );

  return { wishlists, isLoading, error };
}
