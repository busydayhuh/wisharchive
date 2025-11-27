import type { Filter, SortState } from "@/features/dashboard/";
import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query, type Models } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
import useSWRInfinite from "swr/infinite";

type Page = "main-wishes" | "archived" | "booked" | "wishlist";

type QueryFilters = {
  ownerId?: string;
  searchString?: string;
  bookerId?: string;
  wishlistId?: string;
  archived?: boolean;
  sort: SortState;
  filters: Filter[] | [];
};

const QUANTITY_LIMIT = 10;

async function fetcher(queries: string[], cursor: string | null) {
  const withCursor = cursor
    ? [...queries, Query.cursorAfter(cursor)]
    : [...queries];

  const response = await db.wishes.list(withCursor);

  return response.documents as WishDocumentType[];
}

export function useWishes(
  filters?: QueryFilters,
  page: Page = "main-wishes",
  userId?: string
) {
  const queries = filters ? getWishQueries(filters) : null;
  const pageId = `${page}+${userId}`;

  const getWishKey = (
    pageIndex: number,
    previousPageData: Models.Document[] | null
  ) => {
    if (!filters) return null;
    // дошли до конца
    if (previousPageData && previousPageData.length === 0) return null;
    // первая страница, нет previousPageData
    if (pageIndex === 0 && filters)
      return ["wishes", pageId, stableStringify(filters)];
    // добавляем курсор к ключу
    const cursor = previousPageData?.at(-1)?.$id ?? null;

    return ["wishes", pageId, stableStringify(filters), cursor];
  };

  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite(getWishKey, ([, , , cursor]) => fetcher(queries!, cursor), {
      revalidateAll: true,
      keepPreviousData: true,
    }); // если queries null, то key = null и запроса не будет

  const wishes = data?.flat();
  const reachedEnd = data && (data.at(-1)?.length ?? 0) < QUANTITY_LIMIT;

  return { wishes, isLoading, error, size, setSize, isValidating, reachedEnd };
}

function getWishQueries(filters: QueryFilters): string[] {
  const queries: string[] = [Query.limit(QUANTITY_LIMIT)];
  const toolbarFilters =
    filters.filters && filters.filters.length > 0 ? filters.filters : null;

  if (filters?.ownerId) queries.push(Query.equal("ownerId", filters.ownerId));

  if (filters.searchString)
    queries.push(Query.contains("title", filters.searchString));

  if (filters.wishlistId)
    queries.push(Query.equal("wishlistId", filters.wishlistId));

  if (filters.bookerId) queries.push(Query.equal("bookerId", filters.bookerId));

  if (filters.archived !== undefined) {
    queries.push(Query.equal("isArchived", filters.archived));
  }

  if (filters.sort) {
    queries.push(
      filters.sort.direction === "desc"
        ? Query.orderDesc(filters.sort.field)
        : Query.orderAsc(filters.sort.field)
    );
  }

  if (toolbarFilters) {
    toolbarFilters.forEach((f) => {
      if (f.value !== undefined && f.value !== null) {
        queries.push(Query.equal(f.key, f.value));
      }
    });
  }

  return queries;
}
