import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import { useMemo } from "react";
import useSWR from "swr";

async function fetcher(queries: string[]) {
  const response = await db.wishes.list(queries);

  return response.documents as WishDocumentType[];
}

export function useWishes(filters?: {
  ownerId?: string;
  searchString?: string;
  bookerId?: string;
  wishlistId?: string;
  archived?: boolean;
  order?: "asc" | "desc";
  orderBy?: "$sequence" | "price" | "priority" | "title";
}) {
  const queries = useMemo(
    () => (filters ? getWishQueries(filters) : null),
    [filters]
  );

  const key = useMemo(() => (queries ? ["wishes", queries] : null), [queries]);

  const {
    data: wishes,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(queries as string[])); // если queries null, то key = null и запроса не будет

  return { wishes, isLoading, error };
}

function getWishQueries(filters?: {
  ownerId?: string;
  searchString?: string;
  bookerId?: string;
  wishlistId?: string;
  archived?: boolean;
  order?: "asc" | "desc";
  orderBy?: "$sequence" | "price" | "priority" | "title";
}) {
  const queries = [];

  if (filters?.ownerId) {
    queries.push(Query.equal("ownerId", filters.ownerId));
  }

  if (filters?.searchString) {
    queries.push(Query.contains("title", filters?.searchString));
  }

  if (filters?.wishlistId) {
    queries.push(Query.equal("wishlistId", filters.wishlistId));
  }

  if (filters?.bookerId) {
    queries.push(Query.equal("bookerId", filters.bookerId));
  }

  if (filters?.order && filters.orderBy) {
    if (filters.order === "desc") {
      queries.push(Query.orderDesc(filters.orderBy));
    } else {
      queries.push(Query.orderAsc(filters.orderBy));
    }
  }

  queries.push(Query.equal("isArchived", filters?.archived ?? false));

  return queries.length > 0 ? (queries as string[]) : null;
}
