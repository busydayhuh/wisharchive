import { ROUTES } from "@/shared/config/routes";
import { type Params } from "react-router-dom";

export type Crumb = {
  label: string | ((params: Params, data?: Record<string, string>) => string);
  parents?: string[];
};

export const breadcrumbMap: Record<string, Crumb> = {
  [ROUTES.WISHES]: {
    label: (params, data) => `${params.userId || data?.userId}`,
    parents: [ROUTES.DASHBOARD],
  },
  [ROUTES.WISHLISTS]: {
    label: (params, data) => `Списки ${params.userId || data?.userId}`,
    parents: [ROUTES.DASHBOARD],
  },
  [ROUTES.WISH]: {
    label: (_, data) => data?.wishTitle || "Желание",
    parents: [ROUTES.WISHES, ROUTES.WISHLIST, ROUTES.BOOKED, ROUTES.ARCHIVED],
  },
  [ROUTES.WISHLIST]: {
    label: (_, data) => data?.wlTitle || "Список",
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
