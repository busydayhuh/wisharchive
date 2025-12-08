import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import { ROUTES } from "@/shared/config/routes";
import { useMemo } from "react";
import { matchPath } from "react-router";
import type { DashboardType } from "../types";
import { useDashboardType } from "./useDashboardType";

export type DashboardMeta = {
  dashboardOwnerId?: string;
  isDashboardOwner: boolean;
  dashboardHeader: string;
  dashboardType: DashboardType;
  localStorageKey: string;
};

const DASHBOARD_HEADERS = {
  [ROUTES.BOOKED]: "Хочу подарить",
  [ROUTES.ARCHIVED]: "Архив желаний",
  [ROUTES.SHARED]: "Совместные списки",
  [ROUTES.BOOKMARKS]: "Закладки",
  [ROUTES.WISHES]: "Мои желания",
  [ROUTES.WISHLISTS]: "Мои списки",
};

export function useDashboardMeta(): DashboardMeta {
  const { userId } = useAuth();
  const { location, params } = useRoute();
  const { userId: paramUserId, listId: paramListId } = params;

  // Кому принадлежит дашборд
  const dashboardOwnerId = useMemo(
    () => paramUserId || userId,
    [paramUserId, userId]
  );

  const isDashboardOwner = dashboardOwnerId
    ? userId === dashboardOwnerId
    : false;

  // Какой заголовок отображать
  const dashboardHeader =
    Object.entries(DASHBOARD_HEADERS).find(([path]) =>
      matchPath({ path: path, end: true }, location.pathname)
    )?.[1] ?? "Мой дашборд";

  // Тип дашборда для фильтров тулбара
  const { dashboardType } = useDashboardType();

  const localStorageKey = useMemo(() => {
    const param = paramUserId || paramListId || null;
    return param ? `${dashboardType}+${param}` : dashboardType;
  }, [dashboardType, paramListId, paramUserId]);

  return {
    dashboardOwnerId,
    isDashboardOwner,
    dashboardHeader,
    dashboardType,
    localStorageKey,
  };
}
