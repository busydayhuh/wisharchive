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

  const bookWish = useCallback(
    async (pressed: boolean) => {
      if (!current) return navigate(ROUTES.LOGIN);

      try {
        await actions.update(wishId, {
          isBooked: pressed,
          bookerId: pressed ? current.$id : null,
          bookedBy: pressed ? current.$id : null,
        });

        toast.success(
          pressed ? "Желание забронировано" : "Бронирование отменено"
        );
      } catch {
        toast.error(
          pressed ? "Ошибка бронирования" : "Не удалось отменить бронь",
          { description: "Повторите попытку позже" }
        );
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
        toast.success(
          archived ? "Желание восстановлено" : "Желание архивировано"
        );
      } catch {
        toast.error("Не удалось переместить желание", {
          description: "Повторите попытку позже",
        });
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
      toast.success("Желание удалено");
    } catch {
      toast.error("Не удалось удалить желание", {
        description: "Повторите попытку позже",
      });
    }
  }, [wishId, actions]);

  const removeFromWishlist = useCallback(async () => {
    try {
      await actions.update(wishId, {
        wishlistId: null,
        wishlist: null,
      });

      revalidateByKeyword("wishes");
      toast.success("Желание исключено из списка");
    } catch {
      toast.error("Не удалось исключить желание из списка", {
        description: "Повторите попытку позже",
      });
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

        toast.success("Желание перемещено");
      } catch {
        toast.error("Не удалось переместить желание", {
          description: "Повторите попытку позже",
        });
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
