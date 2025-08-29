import db from "@/shared/model/databases";
import type { WishDocumentType } from "@/shared/model/types";
import useSWR from "swr";

async function fetcher(wishId: string) {
  const response = await db.wishes.get(wishId);
  return response as WishDocumentType;
}

export function useWish(wishId?: string | null) {
  const {
    data: wish,
    isLoading,
    error,
    mutate,
  } = useSWR(wishId ?? null, fetcher);

  return { wish, isLoading, error, mutate };
}
