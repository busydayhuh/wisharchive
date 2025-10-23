import db from "@/shared/model/databases";
import { useOptimisticMutation } from "@/shared/model/useOptimisticMutation";
import type { Models } from "appwrite";
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

  const create = useCallback(async (payload: CreateWishProps) => {
    try {
      return await db.wishes.create(payload);
    } catch {
      console.log("Не удалось создать желание");
    }
  }, []);

  const update = useCallback(
    async (wishId: string, payload: UpdateWishProps) => {
      const wishlistChanged = payload.wishlist !== undefined;
      const wishlistReplacement =
        payload.wishlist !== null
          ? { $id: payload.wishlist, title: "", isPrivate: false, ownerId: "" }
          : null;

      return performMutation(
        (prev) =>
          prev.map((wish: Models.Document) =>
            wish.$id === wishId
              ? {
                  ...wish,
                  ...payload,
                  ...(wishlistChanged ? { wishlist: wishlistReplacement } : {}),
                }
              : wish
          ),

        async () => await db.wishes.update(wishId, payload),

        "wishes",
        [wishId]
      );
    },
    [performMutation]
  );

  const deleteW = useCallback(
    async (wishId: string) => {
      return performMutation(
        (prev) => prev.filter((wish: Models.Document) => wish.$id !== wishId),

        async () => {
          await db.wishes.delete(wishId);
        },

        "wishes",
        [wishId]
      );
    },
    [performMutation]
  );

  return { create, update, delete: deleteW };
}
