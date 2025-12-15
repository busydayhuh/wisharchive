import { useWishMutations } from "@/features/wish";
import { handleError } from "@/shared/entities/errors/handleError";
import { type OptimisticUpdater } from "@/shared/hooks/useOptimisticMutation";
import { useUpdateSWRCache } from "@/shared/hooks/useUpdateSWRCache";
import type { WishDocumentType, WishlistDocumentType } from "@/shared/types";
import { sortBySequence } from "@/shared/utils/sortBySequence";
import { useCallback, useMemo, useState } from "react";
import { useSWRConfig } from "swr";
import { useWishlist } from "./useWishlist";

export function useMoveWishes(targetWishlistId: string) {
  const { update } = useWishMutations();
  const { mutate } = useSWRConfig();
  const patchCache = usePatchWishlistCache(targetWishlistId);
  const { wishlist } = useWishlist(targetWishlistId);

  const [pickedWishes, setPickedWishes] = useState<WishDocumentType[]>([]);
  const pickedIds: string[] = useMemo(
    () => pickedWishes.map(({ $id }) => $id),
    [pickedWishes]
  );

  const onPickWish = useCallback(
    (wish: WishDocumentType, added: boolean) =>
      added
        ? setPickedWishes((prev) => [...prev, wish])
        : setPickedWishes((prev) => prev.filter(({ $id }) => $id !== wish.$id)),
    []
  );

  const moveWishes = useCallback(
    async (targetWishlistId: string) => {
      patchCache(targetWishlistId, pickedIds, pickedWishes);

      try {
        await Promise.all(
          pickedIds.map((id) =>
            update(id, {
              wishlist: wishlist,
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
    [mutate, patchCache, pickedIds, pickedWishes, update, wishlist]
  );
  return { onPickWish, moveWishes, pickedIds };
}

function usePatchWishlistCache(targetWishlistId: string) {
  const { updateSWRCache } = useUpdateSWRCache();
  const { mutate } = useSWRConfig();
  const { wishlist } = useWishlist(targetWishlistId);

  const patchWishlistCache = useCallback(
    (
      targetWishlistId: string,
      pickedIds: string[],
      pickedWishes: WishDocumentType[]
    ) => {
      const wishlistsUpdater: OptimisticUpdater = (prev) =>
        prev.map((wl) => {
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

      const wishlistContentUpdater: OptimisticUpdater = (wishes) => {
        const filteredWishes = wishes.filter((w) => !pickedIds.includes(w.$id));
        const addedWishes = pickedWishes.map((w) => ({
          ...w,
          wishlist: wishlist,
          wishlistId: targetWishlistId,
        }));
        return [...filteredWishes, ...addedWishes];
      };

      updateSWRCache("wishlists", wishlistsUpdater);
      updateSWRCache(`wishlist+${targetWishlistId}`, wishlistContentUpdater);

      mutate(targetWishlistId, (wl) => (wl ? wishlistDocUpdater(wl) : wl), {
        rollbackOnError: true,
        revalidate: false,
      });
    },
    [mutate, updateSWRCache, wishlist]
  );

  return patchWishlistCache;
}
