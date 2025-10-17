import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { matchPath, matchRoutes } from "react-router";
import type { DashboardType } from "./toolbarConfig";

export type DashboardMeta = {
  dashboardUserId?: string;
  isDashboardOwner: boolean;
  title: string;
  showTitle: boolean;
  showDashboardOwner: boolean;
  showNavigation: boolean;
  dashboardType: DashboardType;
  localStorageKey: string;
  pathname?: string;
};

const DASHBOARD_HEADERS = {
  [ROUTES.BOOKED]: "Хочу подарить",
  [ROUTES.ARCHIVED]: "Архив желаний",
  [ROUTES.SHARED]: "Совместные списки",
  [ROUTES.BOOKMARKS]: "Закладки",
  [ROUTES.WISHES]: "Мои желания",
  [ROUTES.WISHLISTS]: "Мои списки",
};

const DASHBOARD_TYPES: Record<string, DashboardType> = {
  [ROUTES.BOOKED]: "booked",
  [ROUTES.ARCHIVED]: "archived",
  [ROUTES.SHARED]: "shared",
  [ROUTES.BOOKMARKS]: "bookmarks",
  [ROUTES.DASHBOARD]: "wishes",
  [ROUTES.WISHES]: "wishes",
  [ROUTES.WISHLISTS]: "lists",
  [ROUTES.WISHLIST]: "list",
};

export function useDashboardMeta(): DashboardMeta {
  const isMobile = useIsMobile();

  const { current: authUser } = useAuth();

  const { location, params } = useRoute();
  const { userId: paramUserId, listId: paramListId } = params;

  // Кому принадлежит дашборд
  const dashboardUserId = useMemo(() => {
    if (!paramUserId && !authUser?.$id) return undefined;
    return paramUserId ?? authUser?.$id;
  }, [paramUserId, authUser]);

  const isDashboardOwner = dashboardUserId
    ? authUser?.$id === dashboardUserId
    : false;

  // Какой заголовок отображать

  const title =
    Object.entries(DASHBOARD_HEADERS).find(([path]) =>
      matchPath({ path: path, end: true }, location.pathname)
    )?.[1] ?? "Мой дашборд";

  // Тип дашборда для фильтров тулбара

  const getDashboardType = useCallback(
    (): DashboardType =>
      Object.entries(DASHBOARD_TYPES).find(([path]) =>
        matchPath({ path: path, end: true }, location.pathname)
      )?.[1] ?? "wishes",
    [location.pathname]
  );

  const [dashboardType, setDashboardType] = useState<DashboardType>(() =>
    getDashboardType()
  );

  useEffect(
    () => setDashboardType(getDashboardType()),
    [setDashboardType, getDashboardType, location.pathname]
  );

  const localStorageKey = useMemo(() => {
    const param = paramUserId || paramListId || null;
    return param ? `${dashboardType}+${param}` : dashboardType;
  }, [dashboardType, paramListId, paramUserId]);

  // Отображать ли инфо о владельце дашборда
  const showDashboardOwner = !isMobile || !isDashboardOwner;
  const showTitle = isDashboardOwner;

  // Отображать ли навигацию
  const routes = [{ path: ROUTES.WISHES }, { path: ROUTES.WISHLISTS }];
  const showNavigation = Boolean(matchRoutes(routes, location.pathname));

  return {
    dashboardUserId,
    isDashboardOwner,
    title,
    showTitle,
    showDashboardOwner,
    showNavigation,
    dashboardType,
    localStorageKey,
  };
}
