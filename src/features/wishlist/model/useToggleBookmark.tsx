import { useRevalidationByKeyword } from "@/shared/model/useRevalidationByKeyword";
import { useCallback } from "react";
import { toast } from "sonner";
import { useWishlistMutations } from "./useWishlistMutations";

export function useToggleBookmark(
  wishlistId: string,
  bookmarkedBy: string[] | [],
  userId?: string
) {
  const { update } = useWishlistMutations();
  const { revalidateByKeyword } = useRevalidationByKeyword();

  const toggle = useCallback(
    async (pressed: boolean) => {
      if (!userId) return;

      const updatedList = pressed
        ? [...bookmarkedBy, userId]
        : [...bookmarkedBy].filter((id) => id !== userId);

      const { ok, errorMessage } = await update(wishlistId, {
        bookmarkedBy: updatedList,
      });

      if (!ok) {
        console.log(errorMessage);
        toast.error("Не удалось добавить в закладки");

        return;
      }

      revalidateByKeyword("wishlists");
    },
    [update, wishlistId, bookmarkedBy, userId, revalidateByKeyword]
  );

  return { toggle };
}
