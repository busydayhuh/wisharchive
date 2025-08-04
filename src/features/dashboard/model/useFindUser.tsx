import db from "@/shared/model/databases";
import type { UserDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetcher({
  queries,
  target,
}: {
  queries: string[];
  target: string;
}) {
  const response = await db.users.list(queries);

  if (target === "userById") {
    return response.documents[0] as UserDocumentType;
  }
  return response.documents as UserDocumentType[];
}

function useFindUser(
  userId: string | string[],
  searchString = "",
  target = "userById"
) {
  const queries = {
    userById: [Query.equal("userId", userId)],
    userByName: [
      Query.or([
        Query.contains("userId", searchString),
        Query.contains("userName", searchString),
        Query.contains("userEmail", searchString),
      ]),
    ],
  };

  const {
    data: user,
    isLoading,
    error,
  } = useSWR(
    { queries: queries[target as keyof typeof queries], target: target },
    fetcher
  );

  return { user, isLoading, error };
}

export default useFindUser;
