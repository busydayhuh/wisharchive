import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import { useMemo } from "react";
import useSWR from "swr";

async function fetcher(queries: string[]) {
  const response = await db.wishlists.list(queries);

  console.log("response.documents, queries :>> ", response.documents, queries);

  return response.documents as WishlistDocumentType[];
}

export function useWishlists(filters?: {
  ownerId?: string;
  searchString?: string;
  bookmarkedBy?: string;
  allEditable?: boolean;
  teams?: string[];
  order?: "asc" | "desc";
  orderBy?: "$sequence" | "$updatedAt" | "title";
}) {
  const queries = useMemo(
    () => (filters ? getWishlistQueries(filters) : null),
    [filters]
  );

  const key = useMemo(
    () => (queries ? ["wishlists", queries] : null),
    [queries]
  );

  const {
    data: wishlists,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(queries as string[]), {
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
  allEditable?: boolean;
  teams?: string[];
  order?: "asc" | "desc";
  orderBy?: "$sequence" | "$updatedAt" | "title";
}) {
  const queries = [];

  if (filters?.ownerId && !filters?.teams) {
    queries.push(Query.equal("ownerId", filters.ownerId));
  }

  if (filters?.searchString) {
    queries.push(Query.contains("title", filters?.searchString));
  }

  if (filters?.bookmarkedBy) {
    queries.push(Query.contains("bookmarkedBy", filters?.bookmarkedBy));
  }

  // team каждого вишлиста имеет такой же id, как и вишлист
  // поэтому ищем вишлисты по массиву id teams

  if (filters?.teams && filters?.teams.length > 0 && filters?.ownerId) {
    queries.push(
      Query.equal("$id", filters.teams),
      Query.notEqual("ownerId", filters?.ownerId)
    );
  }

  if (filters?.teams && filters?.teams.length > 0 && !filters?.ownerId) {
    queries.push(Query.equal("$id", filters.teams));
  }

  if (filters?.ownerId && filters?.allEditable) {
    queries.push(
      Query.equal("ownerId", filters?.ownerId),
      Query.contains("editorsIds", filters?.ownerId)
    );
  }

  if (filters?.order && filters.orderBy) {
    if (filters.order === "desc") {
      queries.push(Query.orderDesc(filters.orderBy));
    } else {
      queries.push(Query.orderAsc(filters.orderBy));
    }
  }

  return queries.length > 0 ? (queries as string[]) : null;
}
