import { ROUTES } from "@/shared/model/routes.ts";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        lazy: () => import("@/features/home/home.page"),
      },
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@/features/auth/login.page"),
      },
      {
        path: ROUTES.SIGNUP,
        lazy: () => import("@/features/auth/signup.page"),
      },
      {
        path: ROUTES.WISHES,
        lazy: () => import("@/features/dashboard/dashboard-wishes.page"),
      },
      {
        path: ROUTES.WISHLISTS,
        lazy: () => import("@/features/dashboard/dashboard-lists.page"),
      },
      {
        path: ROUTES.WISHLIST,
        lazy: () => import("@/features/list/list.page"),
      },
      {
        path: ROUTES.WISH,
        lazy: () => import("@/features/wish/wish.page"),
      },
      {
        path: ROUTES.SHARED,
        lazy: () => import("@/features/dashboard/dashboard-shared.page"),
      },
      {
        path: ROUTES.BOOKED,
        lazy: () => import("@/features/dashboard/dashboard-booked.page"),
      },
      {
        path: ROUTES.ARCHIVED,
        lazy: () => import("@/features/dashboard/dashboard-archived.page"),
      },
      {
        path: ROUTES.PROFILE,
        lazy: () => import("@/features/profile/profile.page"),
      },
      {
        path: ROUTES.EDIT,
        lazy: () => import("@/features/wish/wish-edit.page"),
      },
      {
        path: ROUTES.ADD,
        lazy: () => import("@/features/wish/wish-add.page"),
      },
    ],
  },
]);
