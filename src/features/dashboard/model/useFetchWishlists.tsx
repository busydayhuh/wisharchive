import db from "@/shared/model/databases";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Query } from "appwrite";
import useSWR from "swr";

async function fetcher({
  userId,
  collection,
}: {
  userId: string;
  collection: string;
}) {
  const response = await db[collection].list([Query.equal("ownerId", userId)]);

  return response.documents as WishlistDocumentType[];
}

export function useFetchWishlists(userId: string | undefined) {
  const {
    data: wishlists,
    isLoading,
    error,
  } = useSWR({ userId: userId, collection: "wishlists" }, fetcher, {
    onSuccess: (data) => {
      data.reverse();
      data.forEach((wl) => (wl.wishes ? wl.wishes.reverse() : null));
    },
  });

  return { wishlists, isLoading, error };
}
