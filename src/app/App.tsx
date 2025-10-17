import { useAuth } from "@/features/auth";
import { Breadcrumbs, useRoute } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
import { WishlistDialogProvider } from "@/features/wishlist";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import MainContainer from "@/shared/ui/MainContainer";
import { matchRoutes, Outlet } from "react-router-dom";

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

  return (
    <WishlistDialogProvider>
      {current && <AppSidebar />}

      <MainContainer>
        {current && isMobile && (
          <SidebarTrigger className="mt-1 md:-ml-2 rounded-full" />
        )}
        {showBreadcrumbs && <Breadcrumbs />}
        <Outlet />
      </MainContainer>
    </WishlistDialogProvider>
  );
}

export default App;
