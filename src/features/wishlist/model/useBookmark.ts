import type { WishlistDocumentType } from "@/shared/model/types";
import { type OptimisticUpdater } from "@/shared/model/useOptimisticMutation";
import { useUpdateSWRCache } from "@/shared/model/useUpdateSWRCache";
import { notifyError } from "@/shared/ui/CustomToast";
import { useCallback } from "react";
import { useWishlist } from "./useWishlist";
import { useWishlistMutations } from "./useWishlistMutations";

export function useBookmark(
  wishlistId: string,
  bookmarkedBy: string[] | [],
  userId?: string
) {
  const { update } = useWishlistMutations();
  const { updateSWRCache, addToCacheList, removeFromCacheList } =
    useUpdateSWRCache();
  const { wishlist } = useWishlist(wishlistId);

  const toggleBookmark = useCallback(
    async (pressed: boolean) => {
      if (!userId) return;

      const isBookmarking = pressed;

      const updBookmarkedBy = isBookmarking
        ? [...bookmarkedBy, userId]
        : [...bookmarkedBy].filter((id) => id !== userId);

      // обновление списка закладок в кэше
      if (wishlist) {
        const updatedList = {
          ...wishlist,
          bookmarkedBy: updBookmarkedBy,
        } as WishlistDocumentType;

        const updater: OptimisticUpdater = (prev) =>
          isBookmarking
            ? addToCacheList(prev, updatedList)
            : removeFromCacheList(prev, wishlistId);

        updateSWRCache(`bookmarks+${userId}`, updater);
      }

      // обновление вишлиста в БД
      const { ok } = await update(wishlistId, {
        bookmarkedBy: updBookmarkedBy,
      });

      if (!ok) {
        notifyError("Не удалось добавить в закладки");
        return;
      }
    },
    [
      userId,
      bookmarkedBy,
      wishlist,
      update,
      wishlistId,
      updateSWRCache,
      addToCacheList,
      removeFromCacheList,
    ]
  );

  return { toggleBookmark };
}
