import { ROUTES } from "@/shared/model/routes";
import { type Params } from "react-router";

export type Crumb = {
  label: string | ((params: Params, data?: Record<string, string>) => string);
  parents?: string[];
};

export const breadcrumbMap: Record<string, Crumb> = {
  [ROUTES.WISHES]: {
    label: (params, data) => `Желания ${params.userId || data?.userId}`,
    parents: [ROUTES.DASHBOARD],
  },
  [ROUTES.WISHLISTS]: {
    label: (params, data) => `Списки ${params.userId || data?.userId}`,
    parents: [ROUTES.DASHBOARD],
  },
  [ROUTES.WISH]: {
    label: (params, data) => data?.wishTitle || params.wishId || "",
    parents: [ROUTES.WISHES, ROUTES.WISHLIST, ROUTES.BOOKED, ROUTES.ARCHIVED],
  },
  [ROUTES.WISHLIST]: {
    label: (params, data) => data?.wlTitle || params.listId || "",
    parents: [ROUTES.WISHLISTS, ROUTES.SHARED, ROUTES.BOOKMARKS],
  },
  [ROUTES.EDIT]: {
    label: "Редактировать",
    parents: [ROUTES.WISH, ROUTES.WISHES, ROUTES.WISHLIST, ROUTES.ARCHIVED],
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
