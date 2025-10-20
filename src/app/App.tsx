import { useAuth } from "@/features/auth";
import { Breadcrumbs, useRoute } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import MainContainer from "@/shared/ui/MainContainer";
import { matchRoutes, Outlet, useMatch, useNavigation } from "react-router-dom";

function App() {
  const { current } = useAuth();
  const isMobile = useIsMobile();

  const { location } = useRoute();
  const hasBreadcrumbs = [
    { path: ROUTES.WISH },
    { path: ROUTES.WISHLIST },
    { path: ROUTES.EDIT },
  ];
  const showBreadcrumbs = Boolean(
    matchRoutes(hasBreadcrumbs, location.pathname)
  );
  const onWishPage = Boolean(useMatch(ROUTES.WISH));
  const outside = Boolean(
    matchRoutes(
      [{ path: ROUTES.HOME }, { path: ROUTES.LOGIN }, { path: ROUTES.SIGNUP }],
      location.pathname
    )
  );

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {current && <AppSidebar />}

      <MainContainer slimLayout={onWishPage} outside={outside}>
        <div className="flex items-baseline gap-2 mt-3">
          {current && isMobile && (
            <SidebarTrigger className="mt-1 md:-ml-2 rounded-full" />
          )}
          {showBreadcrumbs && <Breadcrumbs />}
        </div>
        {isLoading && <DefaultLoader />}
        <Outlet />
      </MainContainer>
    </>
  );
}

export default App;
