import { Query } from "appwrite";
import useSWR from "swr";
import db from "../databases";
import type { UserDocumentType } from "../types";

// Возвращает массив документов юзеров, подходящих под поисковый запрос

async function fetcher({ searchString }: { searchString: string }) {
  const response = await db.users.list([
    Query.or([
      Query.contains("userId", searchString),
      Query.contains("userName", searchString),
      Query.contains("userEmail", searchString),
    ]),
  ]);

  return response.documents as UserDocumentType[];
}

export function useUsers(searchString: string) {
  const { data: users, isLoading, error } = useSWR({ searchString }, fetcher);

  return { users, isLoading, error };
}
