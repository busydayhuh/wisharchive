import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
import useSWR from "swr";

async function fetcher(queries: string[]) {
  const response = await db.wishlists.list(queries);
  return response.documents as WishlistDocumentType[];
}

export function useWishlists(filters?: {
  ownerId?: string;
  searchString?: string;
  bookmarkedBy?: string;
  teams?: string[];
  order?: "asc" | "desc";
  orderBy?: "$sequence" | "$updatedAt" | "title";
}) {
  const queries = filters ? getWishlistQueries(filters) : null;
  const key = filters ? ["wishlists", stableStringify(filters)] : null;

  const {
    data: wishlists,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(queries!), {
    onSuccess: (data) => {
      data.forEach((wl) => (wl.wishes ? wl.wishes.reverse() : null));
    },
  });

  return { wishlists, isLoading, error };
}

function getWishlistQueries(filters?: {
  ownerId?: string;
  searchString?: string;
  bookmarkedBy?: string;
  teams?: string[];
  order?: "asc" | "desc";
  orderBy?: "$sequence" | "$updatedAt" | "title";
}) {
  const queries = [];

  if (filters?.ownerId && !filters?.teams)
    queries.push(Query.equal("ownerId", filters.ownerId));

  if (filters?.searchString)
    queries.push(Query.contains("title", filters?.searchString));

  if (filters?.bookmarkedBy)
    queries.push(Query.contains("bookmarkedBy", filters?.bookmarkedBy));

  // team каждого вишлиста имеет такой же id, как и вишлист
  // поэтому ищем вишлисты по массиву id teams

  if (filters?.teams && filters?.teams.length > 0 && filters?.ownerId)
    queries.push(
      Query.equal("$id", filters.teams),
      Query.notEqual("ownerId", filters?.ownerId)
    );

  if (filters?.teams && filters?.teams.length > 0 && !filters?.ownerId)
    queries.push(Query.equal("$id", filters.teams));

  if (filters?.order && filters.orderBy) {
    queries.push(
      filters.order === "desc"
        ? Query.orderDesc(filters.orderBy)
        : Query.orderAsc(filters.orderBy)
    );
  }

  return queries;
}
