import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  WISHES: "/wishes/:userId",
  WISHLISTS: "/lists/:userId",
  WISHLIST: "/list/:listId",
  WISH: "/wish/:wishId",
  /* PROTECTED */
  SHARED: "/lists/shared",
  BOOKED: "/wishes/booked",
  ARCHIVED: "/wishes/archived",
  PROFILE: "/edit-profile",
  EDIT: "/edit-wish/:wishId",
  ADD: "/add-wish",
} as const;

export type PathParams = {
  [ROUTES.WISHES]: {
    userId: string;
  };
  [ROUTES.WISHLISTS]: {
    userId: string;
  };
  [ROUTES.WISHLIST]: {
    listId: string;
  };
  [ROUTES.WISH]: {
    wishId: string;
  };
  [ROUTES.EDIT]: {
    wishId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
