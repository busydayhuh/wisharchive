import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams } from "@/shared/model/types";
import { useRevalidationByKeyword } from "@/shared/model/useRevalidationByKeyword";
import { useCallback } from "react";
import { href, useNavigate } from "react-router";
import { useWishMutations } from "./useWishMutations";

export function useWishQuickActions(wishId: string) {
  const { current } = useAuth();
  const navigate = useNavigate();
  const { revalidateByKeyword } = useRevalidationByKeyword();
  const actions = useWishMutations();

  const bookWish = useCallback(
    async (pressed: boolean) => {
      if (!current) return navigate(ROUTES.LOGIN);

      try {
        await actions.update(wishId, {
          isBooked: pressed,
          bookerId: pressed ? current.$id : null,
          bookedBy: pressed ? current.$id : null,
        });
      } catch {
        console.log("Не удалось забронировать желание");
      }
    },
    [current, navigate, wishId, actions]
  );

  const archiveWish = useCallback(
    async (archived: boolean) => {
      try {
        await actions.update(wishId, {
          isArchived: !archived,
          wishlist: null,
          wishlistId: null,
        });

        revalidateByKeyword("wishes");
      } catch {
        console.log("Не удалось изменить статус архива");
      }
    },
    [wishId, revalidateByKeyword, actions]
  );

  const editWish = useCallback(
    (linkState: LinkParams["state"]) =>
      navigate(href(ROUTES.EDIT, { wishId }), { state: linkState }),
    [wishId, navigate]
  );

  const deleteWish = useCallback(async () => {
    try {
      await actions.delete(wishId);
    } catch {
      console.log("Не удалось удалить желание");
    }
  }, [wishId, actions]);

  const removeFromWishlist = useCallback(async () => {
    try {
      await actions.update(wishId, {
        wishlistId: null,
        wishlist: null,
      });

      revalidateByKeyword("wishes");
    } catch {
      console.log("Не удалось исключить желание из списка");
    }
  }, [wishId, revalidateByKeyword, actions]);

  const changeWishlist = useCallback(
    async (newWlId: string | null) => {
      try {
        await actions.update(wishId, {
          wishlistId: newWlId,
          wishlist: newWlId,
        });

        Promise.all([
          revalidateByKeyword("wishes"),
          revalidateByKeyword("wishlists"),
        ]);
      } catch {
        console.log("Не удалось изменить список");
      }
    },
    [wishId, revalidateByKeyword, actions]
  );

  return {
    bookWish,
    archiveWish,
    deleteWish,
    editWish,
    removeFromWishlist,
    changeWishlist,
  };
}
