import { Query } from "appwrite";
import useSWR from "swr";
import db from "../databases";
import type { UserDocumentType } from "../types";

// Возвращает массив документов юзеров, подходящих под поисковый запрос

async function fetcher(key: { searchStrings: string[] }) {
  const response = await db.users.list([
    Query.or([
      Query.contains("userId", key.searchStrings),
      Query.contains("userName", key.searchStrings),
      Query.contains("userEmail", key.searchStrings),
    ]),
  ]);

  return response.documents as UserDocumentType[];
}

export function useUsers(searchStrings: string[] | null) {
  const key =
    searchStrings && searchStrings.length > 0 ? { searchStrings } : null;

  const {
    data: users,
    isLoading,
    error,
  } = useSWR(key, fetcher, {
    onError: (err) => {
      console.error("Ошибка SWR хук useUsers для ключа", searchStrings, err);
      console.trace();
    },
  });
  return { users, isLoading, error };
}
