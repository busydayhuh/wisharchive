import type { Filter, SortState } from "@/features/dashboard";
import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query, type Models } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
import useSWRInfinite from "swr/infinite";

export type QueryFilters = {
  ownerId?: string;
  searchString?: string;
  bookmarkedBy?: string;
  teams?: string[];
  sort: SortState;
  filters: Filter[] | [];
  limit?: number;
};

const QUANTITY_LIMIT = 15;

async function fetcher(queries: string[], cursor: string | null) {
  const withCursor = cursor
    ? [...queries, Query.cursorAfter(cursor)]
    : [...queries];

  const response = await db.wishlists.list(withCursor);
  return response.documents as WishlistDocumentType[];
}

export function useWishlists(filters?: QueryFilters) {
  const queries = filters ? getWishlistQueries(filters) : null;

  const getWishlistKey = (
    pageIndex: number,
    previousPageData: Models.Document[] | null
  ) => {
    if (!filters) return null;

    // дошли до конца
    console.log(
      "🚀 ~ useWishlists.tsx:41 ~ getWishlistKey ~ previousPageData:",
      previousPageData
    );
    if (previousPageData && previousPageData.length === 0) return null;
    // первая страница, нет previousPageData
    if (pageIndex === 0 && filters)
      return ["wishlists", stableStringify(filters)];
    // добавляем курсор к ключу
    const cursor = previousPageData?.at(-1)?.$id ?? null;

    return ["wishlists", stableStringify(filters), cursor];
  };

  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite(
      getWishlistKey,
      ([, , cursor]) => fetcher(queries!, cursor),
      {
        onSuccess: (data) => {
          data.flat().forEach((wl) => (wl.wishes ? wl.wishes.reverse() : null));
        },
      }
    );

  const wishlists = data?.flat();
  const reachedEnd = data && (data.at(-1)?.length ?? 0) < QUANTITY_LIMIT;

  return {
    wishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  };
}

function getWishlistQueries(filters: QueryFilters) {
  const queries = [Query.limit(filters.limit || QUANTITY_LIMIT)];
  const toolbarFilters =
    filters.filters && filters.filters.length > 0 ? filters.filters : null;

  if (filters.ownerId && !filters.teams)
    queries.push(Query.equal("ownerId", filters.ownerId));

  if (filters.searchString)
    queries.push(Query.contains("title", filters?.searchString));

  if (filters.bookmarkedBy)
    queries.push(Query.contains("bookmarkedBy", filters?.bookmarkedBy));

  // team каждого вишлиста имеет такой же id, как и вишлист
  // поэтому ищем вишлисты по массиву id teams
  if (filters.teams && filters?.teams.length > 0)
    queries.push(Query.equal("$id", filters.teams));

  if (filters.sort) {
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
