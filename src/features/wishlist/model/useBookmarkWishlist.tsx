import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";
import { mutate } from "swr";
import { wishlistMutations } from "./wishlistMutations";

export function useBookmarkWishlist(
  wishlistId: string,
  bookmarkedBy: string[] | []
) {
  const { current } = useAuth();
  const navigate = useNavigate();

  async function toggleBookmark(pressed: boolean) {
    if (!current) return navigate(ROUTES.LOGIN);

    const updatedList = pressed
      ? [...bookmarkedBy, current.$id]
      : [...bookmarkedBy].filter((id) => id !== current.$id);

    try {
      await wishlistMutations.update(wishlistId, {
        bookmarkedBy: updatedList,
      });

      mutate((key) => Array.isArray(key) && key[0] === "wishlists");
    } catch {
      console.log("Не удалось обновить закладки");
    }
  }

  return { toggleBookmark };
}
