import db from "@/shared/model/databases";
import { performMutation } from "@/shared/model/performOptimisticMutation";
import team from "@/shared/model/teams";
import type { UserDocumentType } from "@/shared/model/types";
import { ID, Permission, Role, type Models } from "appwrite";

type createWishlistProps = {
  title: string;
  description?: string;
  isPrivate: boolean;
  ownerId: string;
  owner?: UserDocumentType;
};

async function createWishlistMutation(payload: createWishlistProps) {
  const id = ID.unique(); // id для нового вишлиста и его команды
  const permissions = configureWishlistPermissions(payload.isPrivate, id);

  try {
    return performMutation(
      (prev) => [
        ...prev,
        {
          $id: id,
          $collectionId: "wishlists",
          $databaseId: "wisharchive",
          $createdAt: "",
          $updatedAt: "",
          $permissions: [],
          ...payload,
        },
      ],

      async () => {
        const newTeam = await team.create(payload.title, id);
        return await db.wishlists.create(
          payload,
          permissions,
          newTeam.$id // задаем вишлисту такой же id, как и у созданной под него команды
        );
        // вместе с вишлистом удаляем и его команду
      },

      "wishlists"
    );
  } catch {
    console.log("Не удалось создать вишлист");
  }
}

async function updateWishlistMutation(
  wishlistId: string,
  payload: object,
  isPrivate = false,
  privacyChanged = false
) {
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
}

async function deleteWishlistMutation(wishlistId: string) {
  return performMutation(
    (prev) => prev.filter((wl: Models.Document) => wl.$id !== wishlistId),

    async () => {
      await db.wishlists.delete(wishlistId);
      await team.delete(wishlistId); // вместе с вишлистом удаляем и его команду
    },

    "wishlists",
    [wishlistId]
  );
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

export const wishlistMutations = {
  create: createWishlistMutation,
  update: updateWishlistMutation,
  delete: deleteWishlistMutation,
};
