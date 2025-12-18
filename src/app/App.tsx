import { useAuth } from "@/features/auth";
import { BreadcrumbsBar } from "@/features/breadcrumbs";
import { Header } from "@/features/header";
import { AppSidebar } from "@/features/sidebar";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import DefaultLoader from "@/shared/ui/components/DefaultLoader";
import MainContainer from "@/shared/ui/components/MainContainer";
import OrionBackground from "@/shared/ui/components/OrionBackground";
import { Toaster } from "@/shared/ui/kit/sonner";
import { cn } from "@/shared/utils/css";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  const { isLoggedIn } = useAuth();
  const { loginArea } = useAppLocation();
  const isMobile = useIsMobile();
  const isLoading = useNavigation().state === "loading";

  return (
    <>
      {isLoggedIn && <AppSidebar />}
      {!loginArea && <OrionBackground />}
      <MainContainer>
        {!isLoggedIn && <Header />}
        <BreadcrumbsBar isMobile={isMobile} isUser={isLoggedIn} />
        <Outlet />
        {isLoading && (
          <div
            className={cn(
              "z-50 fixed inset-0 flex justify-center items-center bg-background transition-opacity duration-300",
              isLoading
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
          >
            <DefaultLoader />
          </div>
        )}
      </MainContainer>
      <Toaster
        position={isMobile ? "top-center" : "bottom-center"}
        toastOptions={{
          classNames: {
            toast:
              "!rounded-xl !shadow-xs !text-primary-foreground !bg-primary !ring-0 !border-0",
            title: "!font-semibold !text-sm",
            description: "!text-primary-foreground",
            actionButton: "!bg-primary-foreground !text-primary",
            closeButton: "!bg-primary-foreground !text-primary",
          },
        }}
      />
    </>
  );
}

export default App;
