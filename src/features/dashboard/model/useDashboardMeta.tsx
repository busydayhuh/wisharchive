import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/model/routes";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { useLocation, useParams } from "react-router";

const DASHBOARD_HEADERS = {
  [ROUTES.BOOKED]: "Хочу подарить",
  [ROUTES.ARCHIVED]: "Архив желаний",
  [ROUTES.SHARED]: "Совместные списки",
  [ROUTES.BOOKMARKS]: "Избранные списки",
};

export function useDashboardMeta() {
  const { isMobile } = useSidebar();

  const { current: authUser } = useAuth();
  const { userId: paramUserId } = useParams();

  const { pathname } = useLocation();

  // Кому принадлежит дашборд
  const dashboardUserId = paramUserId ?? authUser?.$id ?? "";
  const isDashboardOwner = authUser?.$id === dashboardUserId;

  // Какой заголовок отображать
  const dashboardHeader =
    DASHBOARD_HEADERS[pathname as keyof typeof DASHBOARD_HEADERS];

  const title = dashboardHeader
    ? dashboardHeader
    : isDashboardOwner
    ? "Мой дашборд желаний"
    : null;

  // Отображать ли инфо о владельце дашборда
  const showDashboardOwner = !isMobile || !isDashboardOwner;

  return {
    dashboardUserId,
    isDashboardOwner,
    title,
    showDashboardOwner,
    isMobile,
  };
}
