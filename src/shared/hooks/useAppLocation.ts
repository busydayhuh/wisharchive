import { ROUTES } from "@/shared/config/routes";
import { matchRoutes, useLocation, useMatch } from "react-router-dom";

export function useAppLocation() {
  const { pathname, search } = useLocation();

  const loginArea = Boolean(
    matchRoutes(
      [
        { path: ROUTES.LOGIN },
        { path: ROUTES.SIGNUP },
        { path: ROUTES.RECOVERY },
      ],
      pathname
    )
  );
  const page = {
    home: Boolean(useMatch(ROUTES.HOME)),
    list: Boolean(useMatch(ROUTES.WISHLIST)),
    booked: Boolean(useMatch(ROUTES.BOOKED)),
    bookmarks: Boolean(useMatch(ROUTES.BOOKMARKS)),
    shared: Boolean(useMatch(ROUTES.SHARED)),
    wish: Boolean(useMatch(ROUTES.WISH)),
    edit: Boolean(useMatch(ROUTES.EDIT)),
    profile: Boolean(useMatch(ROUTES.PROFILE)),
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
