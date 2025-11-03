import { useAuth } from "@/features/auth";
import { BreadcrumbsBar, useRoute } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import { BlobsBackground } from "@/shared/ui/BlobsBackground";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import MainContainer from "@/shared/ui/MainContainer";
import { matchRoutes, Outlet, useNavigation } from "react-router-dom";

function App() {
  const { current } = useAuth();
  const isMobile = useIsMobile();
  const { location } = useRoute();

  const slim = Boolean(
    matchRoutes(
      [{ path: ROUTES.WISH }, { path: ROUTES.EDIT }, { path: ROUTES.PROFILE }],
      location.pathname
    )
  );
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
      {!outside && !isMobile && <BlobsBackground />}

      <MainContainer slimLayout={slim} outside={outside}>
        <BreadcrumbsBar
          isMobile={isMobile}
          path={location.pathname}
          isUser={Boolean(current?.$id)}
        />
        <Outlet />
        {isLoading && (
          <div
            className={cn(
              "z-50 fixed inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm transition-opacity duration-300",
              isLoading
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            <DefaultLoader />
          </div>
        )}
      </MainContainer>
    </>
  );
}

export default App;
