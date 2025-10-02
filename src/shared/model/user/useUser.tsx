import { Query } from "appwrite";
import useSWR from "swr";
import db from "../databases";
import type { UserDocumentType } from "../types";

// Возвращает документ с информацией о конкретном юзере по id юзера

async function fetcher(userId: string) {
  const response = await db.users.list([Query.equal("userId", userId)]);

  return response.documents[0] as UserDocumentType;
}

export function useUser(userId?: string | null) {
  const key = userId ? ["user", userId] : null;
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(key, ([, userId]) => fetcher(userId), {
    onError: (err) => {
      console.error("Ошибка SWR для ключа", userId, err);
      console.trace();
    },
  });

  return { user, isLoading, error };
}
