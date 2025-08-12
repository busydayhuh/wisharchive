// eslint-disable-next-line boundaries/element-types
import { useAuth } from "@/features/auth";
import { Query } from "appwrite";
import useSWR from "swr";
import db from "../databases";
import type { UserDocumentType } from "../types";

// Возвращает документ с информацией об авторизованном юзере

async function fetcher({ userId }: { userId: string }) {
  const response = await db.users.list([Query.equal("userId", userId)]);

  return response.documents[0] as UserDocumentType;
}

export function useUser() {
  const { current } = useAuth();
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(current ? current.$id : null, fetcher);

  return { user, isLoading, error };
}
