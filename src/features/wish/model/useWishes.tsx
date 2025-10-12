import type { Filter, SortState } from "@/features/dashboard/";
import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
import useSWR from "swr";

type QueryFilters = {
  ownerId?: string;
  searchString?: string;
  bookerId?: string;
  wishlistId?: string;
  archived?: boolean;
  sort: SortState;
  filters: Filter[] | [];
};

async function fetcher(queries: string[]) {
  const response = await db.wishes.list(queries);

  return response.documents as WishDocumentType[];
}

export function useWishes(filters?: QueryFilters) {
  const queries = filters ? getWishQueries(filters) : null;
  const key = filters ? ["wishes", stableStringify(filters)] : null;

  if (filters?.filters?.some((f) => f.key === "isPrivate"))
    console.log("Error filters in useWishes:", filters);

  const {
    data: wishes,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(queries!)); // если queries null, то key = null и запроса не будет

  return { wishes, isLoading, error };
}

function getWishQueries(filters?: QueryFilters): string[] {
  const queries: string[] = [];
  const toolbarFilters =
    filters?.filters && filters?.filters.length > 0 ? filters.filters : null;

  if (filters?.ownerId) queries.push(Query.equal("ownerId", filters.ownerId));

  if (filters?.searchString)
    queries.push(Query.contains("title", filters.searchString));

  if (filters?.wishlistId)
    queries.push(Query.equal("wishlistId", filters.wishlistId));

  if (filters?.bookerId)
    queries.push(Query.equal("bookerId", filters.bookerId));

  if (filters?.archived !== undefined) {
    queries.push(Query.equal("isArchived", filters.archived));
  }

  if (filters?.sort) {
    queries.push(
      filters.sort.direction === "desc"
        ? Query.orderDesc(filters.sort.field)
        : Query.orderAsc(filters.sort.field)
    );
  }

  if (toolbarFilters) {
    toolbarFilters.forEach((f) => {
      if (f.value) {
        queries.push(Query.equal(f.key, f.value));
      }
    });
  }

  return queries;
}
