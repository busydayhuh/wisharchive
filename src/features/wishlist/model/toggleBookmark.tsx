import { mutate } from "swr";
import { wishlistMutations } from "./wishlistMutations";

export async function toggleBookmark(
  pressed: boolean,
  wishlistId: string,
  bookmarkedBy: string[] | [],
  userId?: string
) {
  if (!userId) return;
  const updatedList = pressed
    ? [...bookmarkedBy, userId]
    : [...bookmarkedBy].filter((id) => id !== userId);

  try {
    await wishlistMutations.update(wishlistId, {
      bookmarkedBy: updatedList,
    });

    mutate((key) => Array.isArray(key) && key[0] === "wishlists");
  } catch {
    console.log("Не удалось обновить закладки");
  }
}
