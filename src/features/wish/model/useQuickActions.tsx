import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import type { LinkParams } from "@/shared/model/types";
import { useRevalidationByKeyword } from "@/shared/model/useRevalidationByKeyword";
import { customToast } from "@/shared/ui/CustomToast";
import { useCallback } from "react";
import { href, useNavigate } from "react-router";
import { toast } from "sonner";
import { useWishMutations } from "./useWishMutations";

export function useQuickActions(
  wishId: string,
  imageURL?: string,
  wishTitle?: string
) {
  const { current } = useAuth();
  const actions = useWishMutations();
  const { revalidateByKeyword } = useRevalidationByKeyword();
  const navigate = useNavigate();

  const showErrorToast = useCallback(
    (text: string) =>
      toast.error(text, { description: "Повторите попытку позже" }),
    []
  );

  const showSuccessToast = useCallback(
    (text: string) =>
      customToast({ title: text, description: wishTitle, icon: imageURL }),
    [imageURL, wishTitle]
  );

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

      showSuccessToast(
        pressed ? "Желание забронировано" : "Бронирование отменено"
      );
    },
    [current, navigate, actions, wishId, showSuccessToast, showErrorToast]
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

      await revalidateByKeyword("wishes");
      showSuccessToast(
        archived ? "Желание восстановлено" : "Желание архивировано"
      );
    },
    [actions, wishId, revalidateByKeyword, showSuccessToast, showErrorToast]
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
    showSuccessToast("Желание удалено");
  }, [actions, wishId, showSuccessToast, showErrorToast]);

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
    showSuccessToast("Исключено из списка");
  }, [actions, wishId, revalidateByKeyword, showSuccessToast, showErrorToast]);

  const changeWishlist = useCallback(
    async (newWlId: string | null, newWlTitle: string) => {
      const { ok } = await actions.update(wishId, {
        wishlistId: newWlId,
        wishlist: newWlId,
      });

      if (!ok) {
        showErrorToast("Не удалось переместить желание");
        return;
      }

      await Promise.all([
        revalidateByKeyword("wishes"),
        revalidateByKeyword("wishlists"),
      ]);

      customToast({
        title: "Перемещено в",
        description: newWlTitle,
        icon: imageURL,
      });
    },
    [actions, wishId, revalidateByKeyword, imageURL, showErrorToast]
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
