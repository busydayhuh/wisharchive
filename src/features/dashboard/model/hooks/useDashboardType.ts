import { ROUTES } from "@/shared/config/routes";
import { useCallback, useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";
import type { DashboardType } from "../types";

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

export function useDashboardType() {
  const { pathname } = useLocation();
  const getDashboardType = useCallback(
    (): DashboardType =>
      Object.entries(DASHBOARD_TYPES).find(([path]) =>
        matchPath({ path: path, end: true }, pathname)
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

  return { dashboardType };
}
