import { ROUTES } from "@/shared/model/routes.ts";
import DefaultLoader from "@/shared/ui/DefaultLoader.tsx";
import { createBrowserRouter } from "react-router-dom";
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
        lazy: () =>
          import("@/features/dashboard/pages/dashboard-wishes.page.tsx"),
        HydrateFallback: DefaultLoader,
        handle: {
          breadcrumb: (params, data) =>
            data?.name || `Дашборд ${params.userId}`,
        } as BreadcrumbHandle,
      },

      {
        path: ROUTES.WISHES,
        lazy: () =>
          import("@/features/dashboard/pages/dashboard-wishes.page.tsx"),
        HydrateFallback: DefaultLoader,
        handle: {
          breadcrumb: (params, data) =>
            data?.name || `Желания ${params.userId}`,
          parents: ["/:userId"],
        } as BreadcrumbHandle,
      },
      {
        path: ROUTES.WISHLISTS,
        lazy: () =>
          import("@/features/dashboard/pages/dashboard-lists.page.tsx"),
        HydrateFallback: DefaultLoader,
        handle: {
          breadcrumb: (params, data) => data?.name || `Списки ${params.userId}`,
          parents: ["/:userId"],
        } as BreadcrumbHandle,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.SHARED,
            lazy: () =>
              import("@/features/dashboard/pages/dashboard-shared.page.tsx"),
            HydrateFallback: DefaultLoader,
            handle: {
              breadcrumb: () => "Совместные списки",
            } as BreadcrumbHandle,
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
              import("@/features/dashboard/pages/dashboard-bookmarks.page.tsx"),
            HydrateFallback: DefaultLoader,
          },
          {
            path: ROUTES.ARCHIVED,
            lazy: () =>
              import("@/features/dashboard/pages/dashboard-archived.page.tsx"),
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
            handle: {
              breadcrumb: (params, data) =>
                data?.name || `Редактировать ${params.wishId}`,
            } as BreadcrumbHandle,
          },
          {
            path: ROUTES.ADD,
            lazy: () => import("@/features/wish/wish-add.page"),
            HydrateFallback: DefaultLoader,
            handle: {
              breadcrumb: () => "Новое желание",
            } as BreadcrumbHandle,
          },
        ],
      },
      {
        path: ROUTES.WISHLIST,
        lazy: () => import("@/features/wishlist/list.page"),
        HydrateFallback: DefaultLoader,
        handle: {
          breadcrumb: (params, data) => data?.name || `${params.wishId}`,
          parents: ["/:userId/lists/", "/shared", "/bookmarks"],
        } as BreadcrumbHandle,
      },
      {
        path: ROUTES.WISH,
        lazy: () => import("@/features/wish/wish.page"),
        HydrateFallback: DefaultLoader,
        handle: {
          breadcrumb: (params, data) => data?.name || `${params.wishId}`,
        } as BreadcrumbHandle,
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
    ],
  },
]);
