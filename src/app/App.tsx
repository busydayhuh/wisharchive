import { useAuth } from "@/features/auth";
import { BreadcrumbsBar, useRoute } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
import { ROUTES } from "@/shared/model/routes";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import MainContainer from "@/shared/ui/MainContainer";
import { matchRoutes, Outlet, useNavigation } from "react-router-dom";

function App() {
  const { current } = useAuth();

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

      <MainContainer slimLayout={onWishPage} outside={outside}>
        <BreadcrumbsBar
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
