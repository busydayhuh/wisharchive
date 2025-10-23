import { useCallback } from "react";
import { useWishlistMutations } from "./useWishlistMutations";

export function useToggleBookmark(
  wishlistId: string,
  bookmarkedBy: string[] | [],
  userId?: string
) {
  const { update } = useWishlistMutations();

  const toggle = useCallback(
    async (pressed: boolean) => {
      if (!userId) return;

      const updatedList = pressed
        ? [...bookmarkedBy, userId]
        : [...bookmarkedBy].filter((id) => id !== userId);

      try {
        await update(wishlistId, {
          bookmarkedBy: updatedList,
        });
      } catch {
        console.log("Не удалось обновить закладки");
      }
    },
    [update, wishlistId, bookmarkedBy, userId]
  );

  return { toggle };
}
