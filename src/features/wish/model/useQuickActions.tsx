import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams } from "@/shared/model/types";
import { useRevalidationByKeyword } from "@/shared/model/useRevalidationByKeyword";
import { useCallback } from "react";
import { href, useNavigate } from "react-router";
import { toast } from "sonner";
import { useWishMutations } from "./useWishMutations";

export function useQuickActions(wishId: string) {
  const { current } = useAuth();
  const navigate = useNavigate();
  const { revalidateByKeyword } = useRevalidationByKeyword();
  const actions = useWishMutations();

  const showErrorToast = (text: string) =>
    toast.error(text, { description: "Повторите попытку позже" });

  const bookWish = useCallback(
    async (pressed: boolean) => {
      if (!current) return navigate(ROUTES.LOGIN);

      const { ok } = await actions.update(wishId, {
        isBooked: pressed,
        bookerId: pressed ? current.$id : null,
        bookedBy: pressed ? current.$id : null,
      });

      if (!ok) {
        showErrorToast(
          pressed ? "Ошибка бронирования" : "Не удалось отменить бронь"
        );
        return;
      }

      toast.success(
        pressed ? "Желание забронировано" : "Бронирование отменено"
      );
    },
    [current, navigate, wishId, actions]
  );

  const archiveWish = useCallback(
    async (archived: boolean) => {
      const { ok } = await actions.update(wishId, {
        isArchived: !archived,
        wishlist: null,
        wishlistId: null,
      });

      if (!ok) {
        showErrorToast("Не удалось переместить желание");
        return;
      }

      revalidateByKeyword("wishes");
      toast.success(
        archived ? "Желание восстановлено" : "Желание архивировано"
      );
    },
    [wishId, revalidateByKeyword, actions]
  );

  const editWish = useCallback(
    (linkState: LinkParams["state"]) =>
      navigate(href(ROUTES.EDIT, { wishId }), { state: linkState }),
    [wishId, navigate]
  );

  const deleteWish = useCallback(async () => {
    const { ok } = await actions.delete(wishId);

    if (!ok) {
      showErrorToast("Не удалось удалить желание");
      return;
    }
    toast.success("Желание удалено");
  }, [wishId, actions]);

  const removeFromWishlist = useCallback(async () => {
    const { ok } = await actions.update(wishId, {
      wishlistId: null,
      wishlist: null,
    });

    if (!ok) {
      showErrorToast("Не удалось исключить желание из списка");
      return;
    }
    revalidateByKeyword("wishes");
    toast.success("Желание исключено из списка");
  }, [wishId, revalidateByKeyword, actions]);

  const changeWishlist = useCallback(
    async (newWlId: string | null) => {
      const { ok } = await actions.update(wishId, {
        wishlistId: newWlId,
        wishlist: newWlId,
      });

      if (!ok) {
        showErrorToast("Не удалось переместить желание");
        return;
      }

      Promise.all([
        revalidateByKeyword("wishes"),
        revalidateByKeyword("wishlists"),
      ]);

      toast.success("Желание перемещено");
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
