import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import { useCallback } from "react";
import { href, useNavigate } from "react-router";
import { mutate } from "swr";
import { wishMutations } from "./wishMutations";

export function useWishQuickActions(wishId: string) {
  const { current } = useAuth();
  const navigate = useNavigate();

  const bookWish = useCallback(
    async (pressed: boolean) => {
      if (!current) return navigate(ROUTES.LOGIN);

      try {
        await wishMutations.update(wishId, {
          isBooked: pressed,
          bookerId: pressed ? current.$id : null,
          bookedBy: pressed ? current.$id : null,
        });
      } catch {
        console.log("Не удалось забронировать желание");
      }
    },
    [current, navigate, wishId]
  );

  const archiveWish = useCallback(
    async (archived: boolean) => {
      try {
        await wishMutations.update(wishId, {
          isArchived: !archived,
        });

        mutate((key) => Array.isArray(key) && key[0] === "wishes");
      } catch {
        console.log("Не удалось изменить статус архива");
      }
    },
    [wishId]
  );

  const editWish = useCallback(
    () => navigate(href(ROUTES.EDIT, { wishId })),
    [wishId, navigate]
  );

  const deleteWish = useCallback(async () => {
    try {
      await wishMutations.delete(wishId);
    } catch {
      console.log("Не удалось удалить желание");
    }
  }, [wishId]);

  return { bookWish, archiveWish, deleteWish, editWish };
}
