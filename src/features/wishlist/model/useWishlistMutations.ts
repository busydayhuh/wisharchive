import db from "@/shared/model/databases";
import { handleError } from "@/shared/model/errors/handleError";
import team from "@/shared/model/teams";
import type { UserDocumentType } from "@/shared/model/types";
import {
  useOptimisticMutation,
  type OptimisticUpdater,
} from "@/shared/model/useOptimisticMutation";
import { useRevalidateSWR } from "@/shared/model/useRevalidateSWR";
import { useUpdateSWRCache } from "@/shared/model/useUpdateSWRCache";
import { ID, Permission, Role, type Models } from "appwrite";
import { useCallback } from "react";

type createWishlistProps = {
  title: string;
  description?: string;
  isPrivate: boolean;
  ownerId: string;
  owner?: UserDocumentType;
};

export function useWishlistMutations() {
  const { performMutation } = useOptimisticMutation();
  const { revalidate } = useRevalidateSWR();
  const { updateSWRCache } = useUpdateSWRCache();

  const create = useCallback(
    async (payload: createWishlistProps) => {
      const id = ID.unique(); // id для нового вишлиста и его команды
      const permissions = configureWishlistPermissions(payload.isPrivate, id);

      const mockWishlist = {
        $id: id,
        $collectionId: "wishlists",
        $databaseId: "wisharchive",
        $createdAt: "",
        $updatedAt: "",
        $permissions: [],
        editorsIds: [],
        readersIds: [],
        ...payload,
      };

      const createWishlist = async () => {
        await team.create(payload.title, id);

        return await db.wishlists.create(
          payload,
          permissions,
          id // задаем вишлисту такой же id, как и у созданной под него команды
        );
      };

      const updateCache: OptimisticUpdater = (prev) => [
        { ...mockWishlist, $sequence: prev.length },
        ...prev,
      ];

      try {
        const newWishlist = await performMutation({
          updater: updateCache,
          action: createWishlist,
          keyword: "wishlists",
        });

        await revalidate("wishlists");
        return { ok: true, response: newWishlist };
      } catch (error) {
        return handleError(error);
      }
    },
    [performMutation, revalidate]
  );

  const update = useCallback(
    async (
      wishlistId: string,
      payload: object,
      isPrivate = false,
      privacyChanged = false
    ) => {
      const updatedPermissions = privacyChanged
        ? configureWishlistPermissions(isPrivate, wishlistId)
        : undefined;

      const updateCache: OptimisticUpdater = (prev) =>
        prev.map((wl: Models.Document) =>
          wl.$id === wishlistId ? { ...wl, ...payload } : wl
        );

      const updateWishlist = async () =>
        await db.wishlists.update(wishlistId, payload, updatedPermissions);

      try {
        await performMutation({
          updater: updateCache,
          action: updateWishlist,
          keyword: "wishlists",
          extraKeys: [wishlistId],
        });

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    [performMutation]
  );

  const deleteWl = useCallback(
    async (wishlistId: string) => {
      const updateCache: OptimisticUpdater = (prev) =>
        prev.filter((wl: Models.Document) => wl.$id !== wishlistId);

      const deleteWishlist = async () => {
        await db.wishlists.delete(wishlistId);
        await team.delete(wishlistId); // вместе с вишлистом удаляем и его команду
      };

      try {
        await performMutation({
          updater: updateCache,
          action: deleteWishlist,
          keyword: "wishlists",
          extraKeys: [wishlistId],
        });

        updateSWRCache("wishes", (prev) =>
          prev.map((w) =>
            w.wishlistId === wishlistId
              ? { ...w, wishlistId: null, wishlist: null }
              : w
          )
        );

        return { ok: true };
      } catch (error) {
        return handleError(error);
      }
    },
    [performMutation, updateSWRCache]
  );

  return { create, update, delete: deleteWl };
}

export function configureWishlistPermissions(
  isPrivate: boolean,
  teamId: string
) {
  const editingPermissions = [
    Permission.read(Role.team(teamId)),
    Permission.update(Role.team(teamId, "owner")),
    Permission.update(Role.team(teamId, "editors")),
    Permission.delete(Role.team(teamId, "owner")),
  ];

  if (!isPrivate) {
    return [Permission.read(Role.any()), ...editingPermissions];
  }

  return editingPermissions;
}
