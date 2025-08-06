import db from "@/shared/model/databases";
import { useFetchWishlists } from "./useFetchWishlists";

export function useWishlistMutations(userId: string, path: string | undefined) {
  const { mutate: mutateDashboard } = useFetchWishlists(userId, path);

  async function updateWishlist(
    wishlistId: string,
    payload?: object,
    permissions?: string[]
  ) {
    try {
      await db.wishlists.update(wishlistId, payload || {}, permissions);
      mutateDashboard();
    } catch {
      alert("Ошибка");
    }
  }

  return { updateWishlist };
}
