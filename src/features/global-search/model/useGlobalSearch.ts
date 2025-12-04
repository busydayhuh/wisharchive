import { useAuth } from "@/features/auth";
import db from "@/shared/model/databases";
import { Query } from "appwrite";
import stableStringify from "fast-json-stable-stringify";
import useSWR from "swr";
import type { Category } from "../GlobalSearch";

type GlobalSearchParams = {
  category: Category;
  search: string;
};

async function fetcher(category: Category, queries: string[]) {
  const response = await db[category].list(queries);

  return response.documents;
}

export function useGlobalSearch(searchParams: GlobalSearchParams) {
  const { userId } = useAuth();

  const queries =
    searchParams.search !== undefined
      ? getGlobalQueries(searchParams, userId)
      : null;
  const key =
    searchParams.search !== undefined && queries
      ? ["global", stableStringify(searchParams)]
      : null;

  const {
    data: results,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(searchParams.category, queries!), {
    keepPreviousData: true,
  }); // если queries null, то key = null и запроса не будет

  return { results, isLoading, error };
}

function getGlobalQueries(
  searchParams: GlobalSearchParams,
  userId?: string
): string[] | null {
  const queries: string[] = [];

  if (!userId) return null;

  if (searchParams.category === "wishes") {
    queries.push(Query.contains("title", searchParams.search));
    queries.push(Query.equal("isArchived", false));
    queries.push(Query.equal("ownerId", userId));
  }

  if (searchParams.category === "wishlists") {
    queries.push(Query.contains("title", searchParams.search));
    queries.push(Query.equal("ownerId", userId));
  }

  if (searchParams.category === "users") {
    queries.push(
      Query.or([
        Query.contains("userId", searchParams.search),
        Query.contains("userName", searchParams.search),
        Query.contains("userEmail", searchParams.search),
      ])
    );
  }

  return queries;
}
