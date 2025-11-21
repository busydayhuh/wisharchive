import type { WishlistDocumentType } from "@/shared/model/types";
import { type OptimisticUpdater } from "@/shared/model/useOptimisticMutation";
import { useUpdateSWRCache } from "@/shared/model/useUpdateSWRCache";
import { useCallback } from "react";
import { toast } from "sonner";
import { useWishlist } from "./useWishlist";
import { useWishlistMutations } from "./useWishlistMutations";

export function useToggleBookmark(
  wishlistId: string,
  bookmarkedBy: string[] | [],
  userId?: string
) {
  const { update } = useWishlistMutations();
  const { updateSWRCache } = useUpdateSWRCache();
  const { wishlist } = useWishlist(wishlistId);

  const toggle = useCallback(
    async (pressed: boolean) => {
      if (!userId) return;

      const updBookmarkedBy = pressed
        ? [...bookmarkedBy, userId]
        : [...bookmarkedBy].filter((id) => id !== userId);

      // стандартное обновление вишлиста
      const { ok, errorMessage } = await update(wishlistId, {
        bookmarkedBy: updBookmarkedBy,
      });

      if (!ok) {
        console.log(errorMessage);
        toast.error("Не удалось добавить в закладки");

        return;
      }

      // обновление списка закладок в кэше
      const updatedWlCache = wishlist
        ? { ...wishlist, bookmarkedBy: updBookmarkedBy }
        : ({} as WishlistDocumentType);

      const updateCache: OptimisticUpdater = (prev) =>
        pressed
          ? [updatedWlCache, ...prev]
          : [...prev].filter((wl) => wl.$id !== wishlistId);

      if (wishlist) {
        updateSWRCache(`bookmarks+${userId}`, updateCache);
      }
    },
    [userId, bookmarkedBy, update, wishlistId, wishlist, updateSWRCache]
  );

  return { toggle };
}
