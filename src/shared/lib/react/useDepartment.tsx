import { ROUTES } from "@/shared/model/routes";
import { matchRoutes, useLocation } from "react-router";

export function useDepartment() {
  const { pathname, search } = useLocation();

  const outside = Boolean(
    matchRoutes(
      [{ path: ROUTES.HOME }, { path: ROUTES.LOGIN }, { path: ROUTES.SIGNUP }],
      pathname
    )
  );

  const slimPage = Boolean(
    matchRoutes(
      [{ path: ROUTES.WISH }, { path: ROUTES.EDIT }, { path: ROUTES.PROFILE }],
      pathname
    )
  );

  const hasBreadcrumbs = Boolean(
    matchRoutes(
      [{ path: ROUTES.WISH }, { path: ROUTES.WISHLIST }, { path: ROUTES.EDIT }],
      pathname
    )
  );

  const showNavigation = Boolean(
    matchRoutes([{ path: ROUTES.WISHES }, { path: ROUTES.WISHLISTS }], pathname)
  );

  const profileView = Boolean(search);

  return { outside, slimPage, hasBreadcrumbs, showNavigation, profileView };
}
