import { useUser } from "@/features/auth";
import { AppSidebar } from "@/features/sidebar";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import MainContainer from "@/shared/ui/MainContainer";
import { Outlet } from "react-router-dom";

function App() {
  const { current } = useUser();

  return (
    <>
      {current && <AppSidebar />}

      <MainContainer>
        {current && (
          <SidebarTrigger className="-ml-2 md:-ml-9 hover:bg-transparent" />
        )}
        <Outlet />
      </MainContainer>
    </>
  );
}

export default App;
