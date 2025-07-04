import { ROUTES } from "@/shared/model/routes";
import { useEffect, useState } from "react";
import { matchRoutes, useLocation } from "react-router";

type Breadcrumb = {
  name: string;
  path: string;
};

const routes: Breadcrumb[] = [
  {
    path: ROUTES.WISHES,
    name: "Дашборд",
  },
  {
    path: ROUTES.WISHLISTS,
    name: "Списки желаний",
  },
  {
    path: ROUTES.WISHLIST,
    name: "Список",
  },
  {
    path: ROUTES.WISH,
    name: "Желание",
  },
  {
    path: ROUTES.SHARED,
    name: "Совместные списки",
  },
  {
    path: ROUTES.BOOKED,
    name: "Хочу подарить",
  },
  {
    path: ROUTES.ARCHIVED,
    name: "Архив желаний",
  },
  {
    path: ROUTES.PROFILE,
    name: "Редактировать профиль",
  },
  {
    path: ROUTES.EDIT,
    name: "Редактировать желание",
  },
  {
    path: ROUTES.ADD,
    name: "Добавить желание",
  },
];

export function usePaths() {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    function getPaths() {
      const allRoutes = matchRoutes(routes, location);
      const currentRoute = allRoutes ? allRoutes[0] : null;

      let breadcrumbs: Breadcrumb[] = [];
      if (currentRoute) {
        breadcrumbs = routes
          .filter((route) => currentRoute.route.path.includes(route.path))
          .map(({ path, ...rest }) => ({
            path: Object.keys(currentRoute.params).length
              ? Object.keys(currentRoute.params).reduce(
                  (path, param) =>
                    path.replace(
                      `:${param}`,
                      currentRoute.params[param] as string
                    ),
                  path
                )
              : path,
            ...rest,
          }));
      }
      setCrumbs(breadcrumbs);
    }

    getPaths();
  }, [location]);

  return crumbs;
}
