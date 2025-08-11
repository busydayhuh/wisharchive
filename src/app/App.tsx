import { useUser } from "@/features/auth";
import CreateButtonWithDropdown from "@/features/create";
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
        {current && <SidebarTrigger className="mt-1 md:-ml-2 rounded-full" />}
        {current && <CreateButtonWithDropdown />}
        <Outlet />
      </MainContainer>
    </>
  );
}

export default App;
