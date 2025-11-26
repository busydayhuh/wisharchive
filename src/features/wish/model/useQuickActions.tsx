import { useAuth } from "@/features/auth";
import type { WishlistDocumentType } from "@/shared/model/types";
import { useUpdateSWRCache } from "@/shared/model/useUpdateSWRCache";
import { useCallback } from "react";
import { useWish } from "./useWish";
import { useWishMutations } from "./useWishMutations";

export function useQuickActions(wishId: string) {
  const { current } = useAuth();
  const { wish } = useWish(wishId);
  const { update, deleteW } = useWishMutations();
  const { updateSWRCache, addToCacheList, removeFromCacheList } =
    useUpdateSWRCache();

  const perform = useCallback(
    async ({
      mutation,
      patch,
    }: {
      mutation: () => Promise<{ ok: boolean }>;
      patch?: () => void;
    }) => {
      const { ok } = await mutation();
      if (!ok) return { ok };
      patch?.();
      return { ok };
    },
    []
  );

  const bookWish = useCallback(
    (isBooking: boolean) => {
      const fields = {
        isBooked: isBooking,
        bookerId: isBooking ? current?.$id : null,
        bookedBy: isBooking ? current?.$id : null,
      };
      const updatedWish = wish ? { ...wish, ...fields } : undefined;

      return perform({
        mutation: () => update(wishId, fields),
        patch: updatedWish
          ? () =>
              updateSWRCache(`booked+${current?.$id}`, (prev) =>
                isBooking
                  ? addToCacheList(prev, updatedWish)
                  : removeFromCacheList(prev, wishId)
              )
          : undefined,
      });
    },
    [
      current?.$id,
      wish,
      perform,
      update,
      wishId,
      updateSWRCache,
      addToCacheList,
      removeFromCacheList,
    ]
  );

  const archiveWish = useCallback(
    (isCurrentlyArchived: boolean) => {
      const isArchiving = !isCurrentlyArchived;
      const fields = {
        isArchived: isArchiving,
        wishlist: null,
        wishlistId: null,
      };
      const updatedWish = wish ? { ...wish, ...fields } : undefined;

      return perform({
        mutation: () => update(wishId, fields),
        patch: updatedWish
          ? () =>
              updateSWRCache(`archived+${current?.$id}`, (prev) =>
                isArchiving
                  ? addToCacheList(prev, updatedWish)
                  : removeFromCacheList(prev, wishId)
              )
          : undefined,
      });
    },
    [
      current,
      wish,
      perform,
      update,
      wishId,
      updateSWRCache,
      addToCacheList,
      removeFromCacheList,
    ]
  );

  const deleteWish = useCallback(
    () =>
      perform({
        mutation: () => deleteW(wishId),
      }),
    [deleteW, perform, wishId]
  );

  const removeFromWishlist = useCallback(() => {
    const oldListId = wish?.wishlistId;

    return perform({
      mutation: () =>
        update(wishId, {
          wishlistId: null,
          wishlist: null,
        }),
      patch: () =>
        updateSWRCache("wishlists", (prev) =>
          prev.map((wl) =>
            wl.$id === oldListId
              ? { ...wl, wishes: removeFromCacheList(wl.wishes, wishId) }
              : wl
          )
        ),
    });
  }, [
    wish?.wishlistId,
    perform,
    update,
    wishId,
    updateSWRCache,
    removeFromCacheList,
  ]);

  const changeWishlist = useCallback(
    (newListId: string | null, newList?: WishlistDocumentType) => {
      const oldListId = wish?.wishlistId;
      const updatedWish = wish
        ? { ...wish, wishlistId: newListId, wishlist: newList }
        : undefined;

      return perform({
        mutation: () =>
          update(wishId, {
            wishlistId: newListId,
            wishlist: newListId,
          }),

        patch:
          updatedWish && newListId
            ? () => {
                updateSWRCache("wishlists", (prev) =>
                  prev.map((wl) => {
                    if (wl.$id === oldListId)
                      return {
                        ...wl,
                        wishes: removeFromCacheList(wl.wishes, wishId),
                      };
                    if (wl.$id === newListId)
                      return {
                        ...wl,
                        wishes: addToCacheList(wl.wishes, updatedWish),
                      };
                    return wl;
                  })
                );
              }
            : undefined,
      });
    },
    [
      wish,
      perform,
      update,
      wishId,
      updateSWRCache,
      removeFromCacheList,
      addToCacheList,
    ]
  );

  return {
    bookWish,
    archiveWish,
    deleteWish,
    removeFromWishlist,
    changeWishlist,
  };
}
