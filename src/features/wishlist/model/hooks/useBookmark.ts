import { notifyError } from "@/shared/entities/errors/notify";
import { type OptimisticUpdater } from "@/shared/hooks/useOptimisticMutation";
import { useUpdateSWRCache } from "@/shared/hooks/useUpdateSWRCache";
import { useWishlistMutations } from "@/shared/hooks/useWishlistMutations";
import type { WishlistDocumentType } from "@/shared/types";
import { useCallback } from "react";
import { useWishlist } from "./useWishlist";

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
