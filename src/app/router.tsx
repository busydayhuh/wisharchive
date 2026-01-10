import { ROUTES } from "@/shared/config/routes.ts";
import DefaultLoader from "@/shared/ui/components/DefaultLoader.tsx";
import { NotFound } from "@/shared/ui/components/NotFound.tsx";
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

export const router = createBrowserRouter(
  [
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
          lazy: () =>
            import("@/features/dashboard/pages/dashboard-wishes.page"),
          HydrateFallback: DefaultLoader,
        },

        {
          path: ROUTES.WISHES,
          lazy: () =>
            import("@/features/dashboard/pages/dashboard-wishes.page"),
          HydrateFallback: DefaultLoader,
        },
        {
          path: ROUTES.WISHLISTS,
          lazy: () =>
            import("@/features/dashboard/pages/dashboard-lists.page.tsx"),
          HydrateFallback: DefaultLoader,
        },

        {
          element: <ProtectedRoute />,
          children: [
            {
              path: ROUTES.SHARED,
              lazy: () =>
                import("@/features/dashboard/pages/dashboard-shared.page.tsx"),
              HydrateFallback: DefaultLoader,
            },
            {
              path: ROUTES.BOOKED,
              lazy: () =>
                import("@/features/dashboard/pages/dashboard-booked.page.tsx"),
              HydrateFallback: DefaultLoader,
            },
            {
              path: ROUTES.BOOKMARKS,
              lazy: () =>
                import(
                  "@/features/dashboard/pages/dashboard-bookmarks.page.tsx"
                ),
              HydrateFallback: DefaultLoader,
            },
            {
              path: ROUTES.ARCHIVED,
              lazy: () =>
                import(
                  "@/features/dashboard/pages/dashboard-archived.page.tsx"
                ),
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
          path: ROUTES.INVITE,
          lazy: () => import("@/features/collaborators/invitation.page.tsx"),
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
            {
              path: ROUTES.RECOVERY,
              lazy: () => import("@/features/auth/recovery.page"),
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
  ],
  {
    basename: "/wisharchive",
  }
);
