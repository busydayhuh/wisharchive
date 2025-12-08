import { useAuth } from "@/features/auth";
import { useWish, useWishMutations } from "@/features/wish";
import { useUpdateSWRCache } from "@/shared/hooks/useUpdateSWRCache";
import type { WishlistDocumentType } from "@/shared/types";
import { useCallback } from "react";

export function useQuickActions(wishId: string) {
  const { current } = useAuth();
  const { wish } = useWish(wishId);
  const { update, deleteW } = useWishMutations();
  const { updateSWRCache, addToCacheList, removeFromCacheList } =
    useUpdateSWRCache();
  const userId = current?.$id;

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
        bookerId: isBooking ? userId : null,
        bookedBy: isBooking ? userId : null,
      };
      const updatedWish = wish ? { ...wish, ...fields } : undefined;

      return perform({
        mutation: () => update(wishId, fields),
        patch: updatedWish
          ? () =>
              updateSWRCache(`booked+${userId}`, (prev) =>
                isBooking
                  ? addToCacheList(prev, updatedWish)
                  : removeFromCacheList(prev, wishId)
              )
          : undefined,
      });
    },
    [
      userId,
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
        isBooked: false,
        bookerId: null,
        bookedBy: null,
      };

      const updatedWish = wish ? { ...wish, ...fields } : undefined;

      return perform({
        mutation: () => update(wishId, fields),
        patch: updatedWish
          ? () => {
              if (isArchiving) {
                updateSWRCache("wishes", (prev) =>
                  removeFromCacheList(prev, wishId)
                );
              } else {
                updateSWRCache(`main-wishes+${userId}`, (prev) =>
                  addToCacheList(prev, updatedWish)
                );
              }

              updateSWRCache(`archived+${userId}`, (prev) =>
                isArchiving
                  ? addToCacheList(prev, updatedWish)
                  : removeFromCacheList(prev, wishId)
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
      userId,
      removeFromCacheList,
      addToCacheList,
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
      patch: () => {
        updateSWRCache("wishlists", (prev) =>
          prev.map((wl) =>
            wl.$id === oldListId
              ? { ...wl, wishes: removeFromCacheList(wl.wishes, wishId) }
              : wl
          )
        );
        updateSWRCache(`wishlist+${oldListId}`, (prev) =>
          removeFromCacheList(prev, wishId)
        );
      },
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
            wishlist: newList,
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
