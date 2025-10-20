import { ROUTES } from "@/shared/model/routes";
import { type Params } from "react-router";

export type Crumb = {
  label: string | ((params: Params, data?: Record<string, string>) => string);
  parents?: string[];
};

export const breadcrumbMap: Record<string, Crumb> = {
  [ROUTES.WISHES]: {
    label: (params, data) => `Желания ${params.userId || data?.userId}`,
    parents: ["/:userId"],
  },
  [ROUTES.WISHLISTS]: {
    label: (params, data) => `Списки ${params.userId || data?.userId}`,
    parents: ["/:userId"],
  },
  [ROUTES.WISH]: {
    label: (params, data) => data?.wishTitle || params.wishId || "",
    parents: [
      "/:userId/wishes",
      "/:userId/lists/:listId",
      "/booked",
      "/archived",
    ],
  },
  [ROUTES.WISHLIST]: {
    label: (params, data) => data?.wlTitle || params.listId || "",
    parents: ["/:userId/lists/", "/shared", "/bookmarks"],
  },
  [ROUTES.EDIT]: {
    label: "Редактировать",
    parents: [
      "/:userId/wishes/:wishId",
      "/:userId/wishes",
      "/:userId/lists/:listId",
      "/archived",
    ],
  },
  [ROUTES.BOOKMARKS]: {
    label: "Закладки",
  },
  [ROUTES.SHARED]: {
    label: "Совместные списки",
  },
  [ROUTES.BOOKED]: {
    label: "Хочу подарить",
  },
  [ROUTES.ARCHIVED]: {
    label: "Архив",
  },
};
