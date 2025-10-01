import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
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
  const queries = filters ? getWishQueries(filters) : null;
  const key = filters ? ["wishes", stableStringify(filters)] : null;

  const {
    data: wishes,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(queries!)); // если queries null, то key = null и запроса не будет

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
}): string[] {
  const queries: string[] = [];

  if (filters?.ownerId) queries.push(Query.equal("ownerId", filters.ownerId));

  if (filters?.searchString)
    queries.push(Query.contains("title", filters.searchString));

  if (filters?.wishlistId)
    queries.push(Query.equal("wishlistId", filters.wishlistId));

  if (filters?.bookerId)
    queries.push(Query.equal("bookerId", filters.bookerId));

  if (filters?.order && filters.orderBy) {
    queries.push(
      filters.order === "desc"
        ? Query.orderDesc(filters.orderBy)
        : Query.orderAsc(filters.orderBy)
    );
  }

  if (filters?.archived !== undefined) {
    queries.push(Query.equal("isArchived", filters.archived));
  }

  return queries;
}
