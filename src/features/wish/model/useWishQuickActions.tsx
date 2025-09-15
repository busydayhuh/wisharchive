import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router";
import { mutate } from "swr";
import { wishMutations } from "./wishMutations";

export function useWishQuickActions(wishId: string) {
  const { current } = useAuth();
  const navigate = useNavigate();

  async function toggleBookingStatus(pressed: boolean) {
    if (!current) return navigate(ROUTES.LOGIN);

    try {
      await wishMutations.update(wishId, {
        isBooked: pressed,
        bookerId: pressed ? current.$id : null,
        bookedBy: pressed ? current.$id : null,
      });

      mutate((key) => Array.isArray(key) && key[0] === "wishes");
    } catch {
      console.log("Не удалось забронировать желание");
    }
  }

  async function archiveWish(archived: boolean) {
    try {
      await wishMutations.update(wishId, {
        isArchived: !archived,
      });

      mutate((key) => Array.isArray(key) && key[0] === "wishes");
    } catch {
      console.log("Не удалось изменить статус архива");
    }
  }

  async function deleteWish() {
    try {
      await wishMutations.delete(wishId);
    } catch {
      console.log("Не удалось удалить желание");
    }
  }

  return { toggleBookingStatus, archiveWish, deleteWish };
}
