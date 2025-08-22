import { useAuth } from "@/features/auth";
import { useWishlistMutations } from "@/features/list";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";

export function useBookmarkWishlist(
  wishlistId: string,
  bookmarkedBy: string[] | []
) {
  const { current } = useAuth();
  const { updateWishlist } = useWishlistMutations(current?.$id ?? "");

  const navigate = useNavigate();

  async function toggleBookmark(pressed: boolean) {
    if (!current) return navigate(ROUTES.LOGIN);

    const updatedList = pressed
      ? [...bookmarkedBy, current.$id]
      : [...bookmarkedBy].filter((id) => id !== current.$id);

    try {
      await updateWishlist(wishlistId, {
        bookmarkedBy: updatedList,
      });
    } catch {
      console.log("Не удалось обновить закладки");
    }
  }

  return { toggleBookmark };
}
