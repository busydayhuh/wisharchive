import db from "@/shared/model/databases";
import team from "@/shared/model/teams";
import type { UserDocumentType } from "@/shared/model/types";
import { useOptimisticMutation } from "@/shared/model/useOptimisticMutation";
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

  const create = useCallback(
    async (payload: createWishlistProps) => {
      const id = ID.unique(); // id для нового вишлиста и его команды
      const permissions = configureWishlistPermissions(payload.isPrivate, id);

      try {
        return performMutation(
          (prev) => [
            {
              $id: id,
              $collectionId: "wishlists",
              $databaseId: "wisharchive",
              $createdAt: "",
              $updatedAt: "",
              $permissions: [],
              editorsIds: [],
              readersIds: [],
              ...payload,
            },
            ...prev,
          ],

          async () => {
            await team.create(payload.title, id);

            return await db.wishlists.create(
              payload,
              permissions,
              id // задаем вишлисту такой же id, как и у созданной под него команды
            );
          },

          "wishlists"
        );
      } catch {
        console.log("Не удалось создать вишлист");
      }
    },
    [performMutation]
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

      return performMutation(
        (prev) =>
          prev.map((wl: Models.Document) =>
            wl.$id === wishlistId ? { ...wl, ...payload } : wl
          ),

        async () =>
          await db.wishlists.update(wishlistId, payload, updatedPermissions),

        "wishlists",
        [wishlistId]
      );
    },
    [performMutation]
  );

  const deleteWl = useCallback(
    async (wishlistId: string) => {
      return performMutation(
        (prev) => {
          return prev.filter((wl: Models.Document) => wl.$id !== wishlistId);
        },

        async () => {
          await db.wishlists.delete(wishlistId);
          await team.delete(wishlistId); // вместе с вишлистом удаляем и его команду
        },

        "wishlists",
        [wishlistId]
      );
    },
    [performMutation]
  );

  return { create, update, delete: deleteWl };
}

export function configureWishlistPermissions(
  isPrivate: boolean,
  teamId: string
) {
  const editingPermissions = [
    Permission.update(Role.team(teamId, "owner")),
    Permission.update(Role.team(teamId, "editors")),
    Permission.delete(Role.team(teamId, "owner")),
  ];

  if (!isPrivate) {
    return [Permission.read(Role.any()), ...editingPermissions];
  }

  return [
    Permission.read(Role.team(teamId, "readers")),
    Permission.read(Role.team(teamId, "owner")),
    ...editingPermissions,
  ];
}
