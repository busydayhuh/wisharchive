import { useAuth } from "@/features/auth";
import { BreadcrumbsBar } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import { Toaster } from "@/shared/ui/kit/sonner";
import MainContainer from "@/shared/ui/MainContainer";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  const { isLoggedIn } = useAuth();
  const isMobile = useIsMobile();

  const isLoading = useNavigation().state === "loading";

  // const { cache } = useSWRConfig();
  // console.log("cache :>> ", cache);

  return (
    <>
      {isLoggedIn && <AppSidebar />}
      <MainContainer>
        <BreadcrumbsBar isMobile={isMobile} isUser={isLoggedIn} />
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
