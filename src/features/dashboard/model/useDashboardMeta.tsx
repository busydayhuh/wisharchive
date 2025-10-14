import { useAuth } from "@/features/auth";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { ROUTES } from "@/shared/model/routes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { matchRoutes, useLocation, useParams } from "react-router";
import type { DashboardType } from "./toolbarConfig";

export type DashboardMeta = {
  dashboardUserId?: string;
  isDashboardOwner: boolean;
  title: string;
  showTitle: boolean;
  showDashboardOwner: boolean;
  showNavigation: boolean;
  dashboardType: DashboardType;
};

const DASHBOARD_HEADERS = {
  [ROUTES.BOOKED]: "Хочу подарить",
  [ROUTES.ARCHIVED]: "Архив желаний",
  [ROUTES.SHARED]: "Совместные списки",
  [ROUTES.BOOKMARKS]: "Закладки",
  "/wishes/": "Мои желания",
  "/lists/": "Мои списки",
};

const DASHBOARD_TYPES: Record<string, DashboardType> = {
  [ROUTES.BOOKED]: "booked",
  [ROUTES.ARCHIVED]: "archived",
  [ROUTES.SHARED]: "shared",
  [ROUTES.BOOKMARKS]: "bookmarks",
  "/wishes/": "wishes",
  "/lists/": "lists",
  "/list/": "list",
};

export function useDashboardMeta(): DashboardMeta {
  const isMobile = useIsMobile();

  const { current: authUser } = useAuth();
  const { userId: paramUserId } = useParams();

  const { pathname } = useLocation();

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
      pathname.startsWith(path)
    )?.[1] ?? "Мой дашборд";

  // Тип дашборда для фильтров тулбара

  const getDashboardType = useCallback(
    (): DashboardType =>
      Object.entries(DASHBOARD_TYPES).find(([path]) =>
        pathname.startsWith(path)
      )?.[1] ?? "wishes",
    [pathname]
  );

  const [dashboardType, setDashboardType] = useState<DashboardType>(() =>
    getDashboardType()
  );

  useEffect(
    () => setDashboardType(getDashboardType()),
    [setDashboardType, getDashboardType, pathname]
  );

  // Отображать ли инфо о владельце дашборда
  const showDashboardOwner = !isMobile || !isDashboardOwner;
  const showTitle = isDashboardOwner;

  // Отображать ли навигацию
  const routes = [{ path: ROUTES.WISHES }, { path: ROUTES.WISHLISTS }];
  const showNavigation = Boolean(matchRoutes(routes, pathname));

  return {
    dashboardUserId,
    isDashboardOwner,
    title,
    showTitle,
    showDashboardOwner,
    showNavigation,
    dashboardType,
  };
}
