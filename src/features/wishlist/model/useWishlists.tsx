import type { Filter, SortState } from "@/features/dashboard";
import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
import useSWR from "swr";

type QueryFilters = {
  ownerId?: string;
  searchString?: string;
  bookmarkedBy?: string;
  teams?: string[];
  sort: SortState;
  filters: Filter[] | [];
};

async function fetcher(queries: string[]) {
  const response = await db.wishlists.list(queries);
  return response.documents as WishlistDocumentType[];
}

export function useWishlists(filters?: QueryFilters) {
  const queries = filters ? getWishlistQueries(filters) : null;
  const key = filters ? ["wishlists", stableStringify(filters)] : null;

  if (filters?.filters.some((f) => f.key === "priority"))
    console.log("filters :>> ", filters);

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

function getWishlistQueries(filters?: QueryFilters) {
  const queries = [];
  const toolbarFilters =
    filters?.filters && filters?.filters.length > 0 ? filters.filters : null;

  if (filters?.ownerId && !filters?.teams)
    queries.push(Query.equal("ownerId", filters.ownerId));

  if (filters?.searchString)
    queries.push(Query.contains("title", filters?.searchString));

  if (filters?.bookmarkedBy)
    queries.push(Query.contains("bookmarkedBy", filters?.bookmarkedBy));

  // team каждого вишлиста имеет такой же id, как и вишлист
  // поэтому ищем вишлисты по массиву id teams
  if (filters?.teams && filters?.teams.length > 0)
    queries.push(Query.equal("$id", filters.teams));

  if (filters?.sort) {
    queries.push(
      filters.sort.direction === "desc"
        ? Query.orderDesc(filters.sort.field)
        : Query.orderAsc(filters.sort.field)
    );
  }

  if (toolbarFilters) {
    toolbarFilters.forEach((f) => {
      if ((f.key === "editorsIds" || f.key === "readersIds") && f.value) {
        queries.push(Query.contains(f.key, f.value as string));
      } else if (f.value) {
        queries.push(Query.equal(f.key, f.value));
      }
    });
  }

  return queries;
}
