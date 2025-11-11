import {
  ArchivedPageWithLayout,
  BookedPageWithLayout,
  BookmarksPageWithLayout,
  SharedPageWithLayout,
  WishesPageWithLayout,
  WishlistPageWithLayout,
} from "@/features/dashboard/";
import { ROUTES } from "@/shared/model/routes.ts";
import DefaultLoader from "@/shared/ui/DefaultLoader.tsx";
import { NotFound } from "@/shared/ui/NotFound.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.tsx";
import { ProtectedRoute, UnauthOnlyRoute } from "./protected-route.tsx";
import Providers from "./providers.tsx";
import { Wrapper } from "./router-scroll-wrapper.tsx";

export type BreadcrumbHandle = {
  breadcrumb?: (
    params: Record<string, string>,
    data?: Record<string, string>
  ) => string;
  parents?: string[] | [];
};

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <Wrapper>
          <App />
        </Wrapper>
      </Providers>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <WishesPageWithLayout />,
        HydrateFallback: DefaultLoader,
      },

      {
        path: ROUTES.WISHES,
        element: <WishesPageWithLayout />,
        HydrateFallback: DefaultLoader,
      },
      {
        path: ROUTES.WISHLISTS,
        element: <WishlistPageWithLayout />,
        HydrateFallback: DefaultLoader,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.SHARED,
            element: <SharedPageWithLayout />,
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.BOOKED,
            element: <BookedPageWithLayout />,
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.BOOKMARKS,
            element: <BookmarksPageWithLayout />,
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.ARCHIVED,
            element: <ArchivedPageWithLayout />,
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.PROFILE,
            lazy: () => import("@/features/profile/profile.page"),
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.EDIT,
            lazy: () => import("@/features/wish/wish-edit.page"),
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.ADD,
            lazy: () => import("@/features/wish/wish-add.page"),
            HydrateFallback: DefaultLoader,
          },
        ],
      },
      {
        path: ROUTES.WISHLIST,
        lazy: () => import("@/features/wishlist/list.page"),
        HydrateFallback: DefaultLoader,
      },
      {
        path: ROUTES.WISH,
        lazy: () => import("@/features/wish/wish.page"),
        HydrateFallback: DefaultLoader,
      },

      {
        element: <UnauthOnlyRoute />,
        children: [
          {
            path: ROUTES.HOME,
            lazy: () => import("@/features/home/home.page"),
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.LOGIN,
            lazy: () => import("@/features/auth/login.page"),
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.SIGNUP,
            lazy: () => import("@/features/auth/signup.page"),
            HydrateFallback: DefaultLoader,
          },
        ],
      },
      { path: "/not-found", element: <NotFound /> },
      {
        path: "*",
        element: <Navigate to={"/not-found"} />,
      },
    ],
  },
]);
