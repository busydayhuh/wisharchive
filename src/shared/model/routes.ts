import "react-router-dom";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/:userId",
  WISHES: "/:userId/wishes",
  WISHLISTS: "/:userId/lists/",
  WISHLIST: "/:userId/lists/:listId",
  WISH: "/:userId/wishes/:wishId",
  /* PROTECTED */
  SHARED: "/shared",
  BOOKMARKS: "/bookmarks",
  BOOKED: "/booked",
  ARCHIVED: "/archived",
  PROFILE: "/edit-profile",
  EDIT: "/wishes/:wishId/editor",
  ADD: "/add-wish",
} as const;

export type PathParams = {
  [ROUTES.DASHBOARD]: {
    userId: string;
  };
  [ROUTES.WISHES]: {
    userId: string;
  };
  [ROUTES.WISHLISTS]: {
    userId: string;
  };
  [ROUTES.WISHLIST]: {
    userId: string;
    listId: string;
  };
  [ROUTES.WISH]: {
    userId: string;
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
