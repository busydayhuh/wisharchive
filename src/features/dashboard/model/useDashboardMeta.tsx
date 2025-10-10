import { useAuth } from "@/features/auth";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { ROUTES } from "@/shared/model/routes";
import { useMemo } from "react";
import { matchRoutes, useLocation, useParams } from "react-router";

const DASHBOARD_HEADERS = {
  [ROUTES.BOOKED]: "Хочу подарить",
  [ROUTES.ARCHIVED]: "Архив желаний",
  [ROUTES.SHARED]: "Совместные списки",
  [ROUTES.BOOKMARKS]: "Закладки",
  "/wishes/": "Мои желания",
  "/lists/": "Мои списки",
};

const DASHBOARD_TYPES = {
  [ROUTES.BOOKED]: "booked",
  [ROUTES.ARCHIVED]: "archived",
  [ROUTES.SHARED]: "shared",
  [ROUTES.BOOKMARKS]: "bookmarks",
  "/wishes/": "wishes",
  "/lists/": "lists",
};

export function useDashboardMeta() {
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
  const dashboardType =
    Object.entries(DASHBOARD_TYPES).find(([path]) =>
      pathname.startsWith(path)
    )?.[1] ?? "wishes";

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
    isMobile,
    showNavigation,
    dashboardType,
  };
}
