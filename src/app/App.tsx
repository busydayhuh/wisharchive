import { useUser } from "@/features/auth";
import { AppSidebar } from "@/features/sidebar";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const user = useUser();

  return (
    <>
      {user.current && <AppSidebar />}
      <main>
        {user.current && <SidebarTrigger />}
        <Outlet />
      </main>
    </>
  );
}

export default App;
