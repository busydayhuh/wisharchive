import db from "@/shared/api/databases";
import type { UserDocumentType } from "@/shared/types";
import { Query } from "appwrite";
import useSWR from "swr";

// Возвращает документ с информацией о конкретном юзере по id юзера

async function fetcher(userId: string) {
  const response = await db.users.list([Query.equal("userId", userId)]);

  if (!response.documents.length) {
    throw new Error("USER_NOT_READY");
  }
  return response.documents[0] as UserDocumentType;
}

export function useUser(userId?: string | null) {
  const key = userId ? ["user", userId] : null;
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR(key, ([, userId]) => fetcher(userId), {
    shouldRetryOnError: true,
    errorRetryInterval: 1000,
    dedupingInterval: 0,
    errorRetryCount: 3,
  });

  return { user, isLoading, error, mutate };
}
