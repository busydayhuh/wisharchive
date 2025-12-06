import { useWishMutations } from "@/features/wish";
import { sortBySequence } from "@/shared/lib/sortBySequence";
import { handleError } from "@/shared/model/errors/handleError";
import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { type OptimisticUpdater } from "@/shared/model/useOptimisticMutation";
import { useUpdateSWRCache } from "@/shared/model/useUpdateSWRCache";
import { useCallback, useMemo } from "react";
import { useSWRConfig } from "swr";

export function useMoveWishes() {
  const { update } = useWishMutations();
  const { mutate } = useSWRConfig();
  const patchCache = usePatchWishlistCache();

  const pickedWishes: WishDocumentType[] = useMemo(() => [], []);
  const pickedIds: string[] = useMemo(
    () => pickedWishes.map(({ $id }) => $id),
    [pickedWishes]
  );

  const onPickWish = useCallback(
    (wish: WishDocumentType) => pickedWishes.push(wish),
    [pickedWishes]
  );

  const moveWishes = useCallback(
    async (targetWishlistId: string) => {
      patchCache(targetWishlistId, pickedIds, pickedWishes);

      try {
        await Promise.all(
          pickedIds.map((id) =>
            update(id, {
              wishlist: targetWishlistId,
              wishlistId: targetWishlistId,
            })
          )
        );
        return { ok: true };
      } catch (error) {
        mutate("wishlists");
        mutate("wishes");
        mutate(targetWishlistId);

        return handleError(error);
      }
    },
    [mutate, patchCache, pickedIds, pickedWishes, update]
  );
  return { onPickWish, moveWishes };
}

function usePatchWishlistCache() {
  const { updateSWRCache } = useUpdateSWRCache();
  const { mutate } = useSWRConfig();

  const patchWishlistCache = useCallback(
    (
      targetWishlistId: string,
      pickedIds: string[],
      pickedWishes: WishDocumentType[]
    ) => {
      const wishlistsUpdater: OptimisticUpdater = (prev) =>
        prev.map(({ wl }) => {
          const isTarget = wl.$id === targetWishlistId;
          const filteredWishes = wl.wishes.filter(
            (w: WishDocumentType) => !pickedIds.includes(w.$id)
          );

          if (isTarget) {
            const addedWishes = pickedWishes.map((w) => ({
              ...w,
              wishlist: wl,
              wishlistId: wl.$id,
            }));
            return {
              ...wl,
              wishes: sortBySequence([...filteredWishes, ...addedWishes]),
            };
          }
          return { ...wl, wishes: filteredWishes };
        });

      const wishlistDocUpdater = (wl: WishlistDocumentType) => {
        const filteredWishes =
          wl.wishes?.filter(
            (w: WishDocumentType) => !pickedIds.includes(w.$id)
          ) ?? [];
        const addedWishes = pickedWishes.map((w) => ({
          ...w,
          wishlist: wl,
          wishlistId: wl.$id,
        }));
        return {
          ...wl,
          wishes: sortBySequence([...filteredWishes, ...addedWishes]),
        };
      };

      updateSWRCache("wishlists", wishlistsUpdater);
      mutate(targetWishlistId, (wl) => (wl ? wishlistDocUpdater(wl) : wl), {
        rollbackOnError: true,
        revalidate: false,
      });
    },
    [mutate, updateSWRCache]
  );

  return patchWishlistCache;
}
