import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetcher({
  collection,
  queries,
}: {
  collection: string;
  queries: string[];
}) {
  const response = await db[collection].list(queries);

  return response.documents as WishDocumentType[];
}

export function useFetchWishesByUser(
  userId = "",
  searchString = "",
  isArchived = false
) {
  const {
    data: wishes,
    isLoading,
    error,
  } = useSWR(
    {
      userId: userId,
      collection: "wishes",
      queries: [
        Query.equal("ownerId", userId),
        Query.contains("title", searchString),
        Query.equal("isArchived", isArchived),
      ],
    },
    fetcher,
    {
      onSuccess: (data) => data.reverse(),
    }
  );

  return { wishes, isLoading, error };
}
