import { useAuth } from "@/features/auth";
import { AppSidebar } from "@/features/sidebar";
import { WishlistDialogProvider } from "@/features/wishlist";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import MainContainer from "@/shared/ui/MainContainer";
import { Outlet } from "react-router-dom";

function App() {
  const { current } = useAuth();
  const isMobile = useIsMobile();

  return (
    <WishlistDialogProvider>
      {current && <AppSidebar />}

      <MainContainer>
        {current && isMobile && (
          <SidebarTrigger className="mt-1 md:-ml-2 rounded-full" />
        )}
        <Outlet />
      </MainContainer>
    </WishlistDialogProvider>
  );
}

export default App;
