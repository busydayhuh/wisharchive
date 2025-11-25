import db from "@/shared/model/databases";
import { handleError } from "@/shared/model/handleError";
import {
  useOptimisticMutation,
  type OptimisticUpdater,
} from "@/shared/model/useOptimisticMutation";
import { useRevalidateSWR } from "@/shared/model/useRevalidateSWR";
import { ID, type Models } from "appwrite";
import { useCallback } from "react";

type CreateWishProps = {
  title: string;
  ownerId: string;
  owner: string;
  price: number | null;
  wishlistId: string | null;
  wishlist: string | null;
  description?: string | null;
  shopURL?: string | null;
  currency?: string;
  isPrivate?: boolean;
};

export type UpdateWishProps = Partial<CreateWishProps> & {
  bookerId?: string | null;
  bookedBy?: string | null;
  isBooked?: boolean;
  isArchived?: boolean;
};

export function useWishMutations() {
  const { performMutation } = useOptimisticMutation();
  const { revalidate } = useRevalidateSWR();

  const create = useCallback(
    async (payload: CreateWishProps) => {
      const id = ID.unique();

      const mockWishForCache = {
        ...payload,
        wishlist: null,
        $id: id,
        $collectionId: "wishes",
        $databaseId: "wisharchive",
        $createdAt: "",
        $updatedAt: "",
        $permissions: [],
      };

      try {
        const newWish = await performMutation({
          updater: (prev) => [mockWishForCache, ...prev],
          action: async () => {
            return await db.wishes.create(payload, undefined, id);
          },
          keyword: "wishes",
        });

        await revalidate("wishes");
        return { ok: true, response: newWish };
      } catch (error) {
        return handleError(error);
      }
    },
    [revalidate, performMutation]
  );

  const update = useCallback(
    async (wishId: string, payload: UpdateWishProps) => {
      const wishlistChanged = payload.wishlist !== undefined;
      // моковый вишлист для кеша до рефетча реальных данных
      const mockWishlist =
        payload.wishlist === null
          ? payload.wishlist
          : {
              $id: payload.wishlist,
              title: "",
              isPrivate: false,
              ownerId: "",
            };

      const updateCache: OptimisticUpdater = (prev) =>
        prev.map((wish: Models.Document) =>
          wish.$id === wishId
            ? {
                ...wish,
                ...payload,
                ...(wishlistChanged ? mockWishlist : {}),
              }
            : wish
        );

      try {
        const updatedWish = await performMutation({
          updater: updateCache,
          action: async () => await db.wishes.update(wishId, payload),
          keyword: "wishes",
          extraKeys: [wishId],
        });

        return { ok: true, response: updatedWish };
      } catch (error) {
        return handleError(error);
      }
    },
    [performMutation]
  );

  const deleteW = useCallback(
    async (wishId: string) => {
      try {
        await performMutation({
          updater: (prev) =>
            prev.filter((wish: Models.Document) => wish.$id !== wishId),
          action: async () => {
            await db.wishes.delete(wishId);
          },
          keyword: "wishes",
          extraKeys: [wishId],
        });

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    [performMutation]
  );

  return { create, update, deleteW };
}
