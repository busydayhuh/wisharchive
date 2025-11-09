import { useAuth } from "@/features/auth";
import { BreadcrumbsBar, useRoute } from "@/features/breadcrumbs";
import { AppSidebar } from "@/features/sidebar";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { BlobsBackground } from "@/shared/ui/BlobsBackground";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import MainContainer from "@/shared/ui/MainContainer";
import { Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  const { current } = useAuth();
  const isMobile = useIsMobile();
  const { location } = useRoute();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {current && <AppSidebar />}
      {!isMobile && <BlobsBackground />}

      <MainContainer>
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
      <Toaster
        position={isMobile ? "top-center" : "bottom-right"}
        closeButton
        toastOptions={{
          classNames: {
            toast: "!rounded-xl !shadow-xs",
          },
        }}
      />
    </>
  );
}

export default App;
