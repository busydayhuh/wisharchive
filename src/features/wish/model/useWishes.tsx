import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import { useLocation } from "react-router";
import useSWR from "swr";

async function fetcher(queries: string[]) {
  const response = await db.wishes.list(queries);

  return response.documents as WishDocumentType[];
}

export function useWishes(userId: string, searchString?: string) {
  const { pathname } = useLocation();
  const queries = getWishQueries(pathname, userId, searchString ?? "");

  const key = ["wishes", userId, queries];

  const {
    data: wishes,
    isLoading,
    error,
  } = useSWR(key, () => fetcher(queries));

  return { wishes, isLoading, error };
}

function getWishQueries(
  pathname: string,
  userId: string,
  searchString: string
) {
  if (pathname.includes("/booked")) {
    return [
      Query.contains("bookerId", userId),
      Query.contains("title", searchString),
      Query.orderDesc("$sequence"),
    ];
  }

  if (pathname.includes("/archived")) {
    return [
      Query.equal("ownerId", userId),
      Query.equal("isArchived", true),
      Query.contains("title", searchString),
      Query.orderDesc("$sequence"),
    ];
  }

  return [
    Query.equal("ownerId", userId),
    Query.contains("title", searchString),
    Query.equal("isArchived", false),
    Query.orderDesc("$sequence"),
  ];
}
