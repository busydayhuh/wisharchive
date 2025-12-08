import db from "@/shared/api/databases";
import { handleError } from "@/shared/entities/errors/handleError";
import {
  useOptimisticMutation,
  type OptimisticUpdater,
} from "@/shared/hooks/useOptimisticMutation";
import { useRevalidateSWR } from "@/shared/hooks/useRevalidateSWR";
import type { WishlistDocumentType } from "@/shared/types";
import { ID, type Models } from "appwrite";
import { useCallback } from "react";

type CreateWishProps = {
  title: string;
  ownerId: string;
  owner: string;
  price: number | null;
  wishlistId: string | null;
  wishlist: WishlistDocumentType | null | string;
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
      const updateCache: OptimisticUpdater = (prev) =>
        prev.map((wish: Models.Document) =>
          wish.$id === wishId
            ? {
                ...wish,
                ...payload,
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
