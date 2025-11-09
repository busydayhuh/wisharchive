import { Query } from "appwrite";
import stringify from "fast-json-stable-stringify";
import useSWR from "swr";
import db from "../databases";
import type { UserDocumentType } from "../types";

// Возвращает массив документов юзеров, подходящих под поисковый запрос

async function fetcher(searchStrings: string[]) {
  const response = await db.users.list([
    Query.or([
      Query.contains("userId", searchStrings),
      Query.contains("userName", searchStrings),
      Query.contains("userEmail", searchStrings),
    ]),
  ]);

  return response.documents as UserDocumentType[];
}

export function useUsers(searchStrings: string[] | null) {
  const key =
    searchStrings && searchStrings.length > 0
      ? ["users", stringify(searchStrings)]
      : null;

  const {
    data: users,
    isLoading,
    error,
  } = useSWR(key, ([, searchStrings]) => fetcher(JSON.parse(searchStrings)), {
    onError: (err) => {
      console.error("Ошибка SWR хук useUsers для ключа", searchStrings, err);
      console.trace();
    },
    keepPreviousData: true,
  });
  return { users, isLoading, error };
}
