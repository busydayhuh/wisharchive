import { UserProvider } from "@/features/auth";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <UserProvider>
      <SidebarProvider defaultOpen={true}>{props.children}</SidebarProvider>
    </UserProvider>
  );
}

export default Providers;
