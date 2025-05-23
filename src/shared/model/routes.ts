import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  WISHES: "/:userId/wishes",
  WISHLISTS: "/:userId/lists",
  WISHLIST: "/lists/:listId",
  WISH: "/wishes/:wishId",
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
