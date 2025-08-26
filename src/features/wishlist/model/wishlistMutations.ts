import db from "@/shared/model/databases";
import team from "@/shared/model/teams";
import type {
  UserDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { ID, Permission, Role } from "appwrite";
import { mutate } from "swr";

type createWishlistProps = {
  title: string;
  description?: string;
  isPrivate: boolean;
  ownerId: string;
  owner?: UserDocumentType;
};

type OptimisticUpdater = (
  prev: WishlistDocumentType[]
) => WishlistDocumentType[];
type ServerAction = () => Promise<WishlistDocumentType | void>;

async function createWishlistMutation(payload: createWishlistProps) {
  const id = ID.unique(); // id для нового вишлиста и его команды
  const permissions = configurePermissions(payload.isPrivate, id);

  try {
    const newTeam = await team.create(payload.title, id);

    return await db.wishlists.create(
      payload,
      permissions,
      newTeam.$id // задаем вишлисту такой же id, как и у созданной под него команды
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
    ? configurePermissions(isPrivate, wishlistId)
    : undefined;

  return performMutation(
    (prev) =>
      prev.map((wl: WishlistDocumentType) =>
        wl.$id === wishlistId ? { ...wl, ...payload } : wl
      ),

    async () =>
      await db.wishlists.update(wishlistId, payload, updatedPermissions)
  );
}

async function deleteWishlistMutation(wishlistId: string) {
  return performMutation(
    (prev) => prev.filter((wl: WishlistDocumentType) => wl.$id !== wishlistId),

    async () => {
      await db.wishlists.delete(wishlistId);
      await team.delete(wishlistId);
    }
  );
}

async function performMutation(
  updater: OptimisticUpdater,
  action: ServerAction
) {
  try {
    mutate(
      (key) => Array.isArray(key) && key[0] === "wishlists",
      (prev?: WishlistDocumentType[]) => updater(prev ?? []),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    );

    return await action();
  } catch {
    console.log("Ошибка мутации списков");

    mutate((key) => Array.isArray(key) && key[0] === "wishlists"); // запрашиваем актуальные данные для отката
  }
}

function configurePermissions(isPrivate: boolean, teamId: string) {
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
