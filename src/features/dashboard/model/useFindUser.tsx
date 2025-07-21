import db from "@/shared/model/databases";
import type { UserDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetchUserDocument(userId: string) {
  const response = await db.users.list([Query.equal("userId", userId)]);
  return response.documents[0] as UserDocumentType;
}

function useFindUser(userId?: string) {
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(`${userId}`, fetchUserDocument);

  return { user, isLoading, error };
}

export default useFindUser;
