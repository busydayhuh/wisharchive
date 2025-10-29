import { useAuth } from "@/features/auth";
import { BreadcrumbsBar, useRoute } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
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

  const onWishPage = Boolean(
    matchRoutes(
      [{ path: ROUTES.WISH }, { path: ROUTES.EDIT }],
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

      <MainContainer slimLayout={onWishPage} outside={outside}>
        <BreadcrumbsBar
          isMobile={isMobile}
          path={location.pathname}
          isUser={Boolean(current?.$id)}
        />
        {isLoading && <DefaultLoader />}
        <Outlet />
      </MainContainer>
    </>
  );
}

export default App;
