import db from "@/shared/model/databases";
import team from "@/shared/model/teams";
import type { UserDocumentType } from "@/shared/model/types";
import { useWishlists } from "../../dashboard";
import { configurePermissions } from "./configurePermissions";

export function useWishlistMutations(userId: string) {
  const { mutate: mutateDashboard } = useWishlists(userId);

  async function createWishlist(payload: {
    title: string;
    description?: string;
    isPrivate: boolean;
    ownerId: string;
    owner?: UserDocumentType;
  }) {
    try {
      const newTeam = await team.create(payload.title);
      const permissions = configurePermissions(payload.isPrivate, newTeam.$id);

      const newWishlist = await db.wishlists.create(
        payload,
        permissions,
        newTeam.$id // задаем вишлисту такой же id, как и у созданной под него команды
      );

      return { newWishlist, newTeam };
    } catch {
      alert("Не удалось создать вишлист");
    }
  }

  async function updateWishlist(
    wishlistId: string,
    isPrivate: boolean,
    payload = {},
    privacyChanged = false
  ) {
    try {
      const updatedPermissions = privacyChanged
        ? configurePermissions(isPrivate, wishlistId)
        : undefined;

      const updatedWishlist = await db.wishlists.update(
        wishlistId,
        payload,
        updatedPermissions
      );

      mutateDashboard();

      return { updatedWishlist };
    } catch {
      alert("Не удалось обновить вишлист");
    }
  }

  async function deleteWishlist(wishlistId: string) {
    try {
      await db.wishlists.delete(wishlistId);
      await team.delete(wishlistId); // удаляем команду вместе с вишлистом

      mutateDashboard();
    } catch {
      alert("Не удалось удалить вишлист");
    }
  }

  return { createWishlist, updateWishlist, deleteWishlist };
}
