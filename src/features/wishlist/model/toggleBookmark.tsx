import { mutateByKeyword } from "@/shared/model/mutateByKeyword";
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

    await mutateByKeyword("wishlists");
  } catch {
    console.log("Не удалось обновить закладки");
  }
}
