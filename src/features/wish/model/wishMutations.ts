import db from "@/shared/model/databases";
import { performMutation } from "@/shared/model/performOptimisticMutation";
import { type Models } from "appwrite";

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

async function createWishMutation(payload: CreateWishProps) {
  try {
    return await db.wishes.create(payload);
  } catch {
    console.log("Не удалось создать вишлист");
  }
}

async function updateWishMutation(wishId: string, payload: UpdateWishProps) {
  const wishlistChanged = payload.wishlist !== undefined;
  const wishlistReplacement =
    payload.wishlist !== null
      ? { $id: payload.wishlist, title: "", isPrivate: false }
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
}

async function deleteWishMutation(wishId: string) {
  return performMutation(
    (prev) => prev.filter((wish: Models.Document) => wish.$id !== wishId),

    async () => {
      await db.wishes.delete(wishId);
    },

    "wishes",
    [wishId]
  );
}

export const wishMutations = {
  create: createWishMutation,
  update: updateWishMutation,
  delete: deleteWishMutation,
};
