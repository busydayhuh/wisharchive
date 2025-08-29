import { DashboardLayout } from "@/features/dashboard";
import { ROUTES } from "@/shared/model/routes.ts";
import { useLayoutEffect, type ReactNode } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import App from "./App.tsx";
import { ProtectedRoute, UnauthOnlyRoute } from "./protected-route.tsx";
import Providers from "./providers.tsx";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
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
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.WISHES,
            lazy: () =>
              import("@/features/dashboard/pages/dashboard-wishes.page.tsx"),
            HydrateFallback: () => null,
          },
          {
            path: ROUTES.WISHLISTS,
            lazy: () =>
              import("@/features/dashboard/pages/dashboard-lists.page.tsx"),
            HydrateFallback: () => null,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: ROUTES.SHARED,
                lazy: () =>
                  import(
                    "@/features/dashboard/pages/dashboard-shared.page.tsx"
                  ),
                HydrateFallback: () => null,
              },
              {
                path: ROUTES.BOOKED,
                lazy: () =>
                  import(
                    "@/features/dashboard/pages/dashboard-booked.page.tsx"
                  ),
                HydrateFallback: () => null,
              },
              {
                path: ROUTES.BOOKMARKS,
                lazy: () =>
                  import(
                    "@/features/dashboard/pages/dashboard-bookmarks.page.tsx"
                  ),
                HydrateFallback: () => null,
              },
              {
                path: ROUTES.ARCHIVED,
                lazy: () =>
                  import(
                    "@/features/dashboard/pages/dashboard-archived.page.tsx"
                  ),
                HydrateFallback: () => null,
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.WISHLIST,
        lazy: () => import("@/features/wishlist/list.page"),
        HydrateFallback: () => null,
      },
      {
        path: ROUTES.WISH,
        lazy: () => import("@/features/wish/wish.page"),
        HydrateFallback: () => null,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.PROFILE,
            lazy: () => import("@/features/profile/profile.page"),
            HydrateFallback: () => null,
          },
          {
            path: ROUTES.EDIT,
            lazy: () => import("@/features/wish/wish-edit.page"),
            HydrateFallback: () => null,
          },
          {
            path: ROUTES.ADD,
            lazy: () => import("@/features/wish/wish-add.page"),
            HydrateFallback: () => null,
          },
        ],
      },
      {
        element: <UnauthOnlyRoute />,
        children: [
          {
            path: ROUTES.HOME,
            lazy: () => import("@/features/home/home.page"),
            HydrateFallback: () => null,
          },
          {
            path: ROUTES.LOGIN,
            lazy: () => import("@/features/auth/login.page"),
            HydrateFallback: () => null,
          },
          {
            path: ROUTES.SIGNUP,
            lazy: () => import("@/features/auth/signup.page"),
            HydrateFallback: () => null,
          },
        ],
      },
    ],
  },
]);
