import { ROUTES } from "@/shared/config/routes";
import { matchRoutes, useLocation, useMatch } from "react-router";

export function useAppLocation() {
  const { pathname, search } = useLocation();

  const loginArea = Boolean(
    matchRoutes(
      [{ path: ROUTES.HOME }, { path: ROUTES.LOGIN }, { path: ROUTES.SIGNUP }],
      pathname
    )
  );
  const page = {
    list: Boolean(useMatch(ROUTES.WISHLIST)),
    booked: Boolean(useMatch(ROUTES.BOOKED)),
    shared: Boolean(useMatch(ROUTES.SHARED)),
    wish: Boolean(useMatch(ROUTES.WISH)),
    edit: Boolean(useMatch(ROUTES.EDIT)),
    profile: Boolean(useMatch(ROUTES.EDIT)),
    dashboard: Boolean(
      matchRoutes(
        [{ path: ROUTES.WISHES }, { path: ROUTES.WISHLISTS }],
        pathname
      )
    ),
  };

  return {
    loginArea,
    page,
    hasSearchParams: Boolean(search),
  };
}
