// eslint-disable-next-line boundaries/element-types
import { useAuth } from "@/features/auth";
import db from "@/shared/api/databases";
import type { UserDocumentType } from "@/shared/types";
import { Query } from "appwrite";
import useSWR from "swr";

// Возвращает документ с информацией об авторизованном юзере

async function fetcher(userId: string) {
  const response = await db.users.list([Query.equal("userId", userId)]);

  return response.documents[0] as UserDocumentType;
}

export function useCurrentUser() {
  const { current } = useAuth();
  const key = current ? ["user", current.$id] : null;

  const {
    data: user,
    isLoading,
    error,
    mutate: mutateUser,
  } = useSWR(key, ([, userId]) => fetcher(userId));

  return { user, isLoading, error, mutateUser };
}
