import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetcher({
  userId,
  collection,
}: {
  userId: string;
  collection: string;
}) {
  const response = await db[collection].list([Query.equal("ownerId", userId)]);

  return response.documents as WishDocumentType[];
}

export function useFetchWishesByUser(userId: string | undefined) {
  const {
    data: wishes,
    isLoading,
    error,
  } = useSWR({ userId: userId, collection: "wishes" }, fetcher);

  return { wishes, isLoading, error };
}
