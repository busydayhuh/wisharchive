import { UserProvider } from "@/features/auth";
import { WishlistDialogProvider } from "@/features/list";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <UserProvider>
      <WishlistDialogProvider>
        <SidebarProvider defaultOpen={true}>{props.children}</SidebarProvider>
      </WishlistDialogProvider>
    </UserProvider>
  );
}

export default Providers;
