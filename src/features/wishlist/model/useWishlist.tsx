import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import useSWR from "swr";

// Возвращает документ с информацией о конкретном вишлисте

async function fetcher(wishlistId: string) {
  const response = await db.wishlists.get(wishlistId);
  return response as WishlistDocumentType;
}

export function useWishlist(wishlistId?: string | null) {
  const {
    data: wishlist,
    isLoading,
    error,
    mutate,
  } = useSWR(wishlistId ?? null, fetcher);

  return { wishlist, isLoading, error, mutate };
}
