import { UserProvider } from "@/features/auth";
import { WishlistDialogProvider } from "@/features/wishlist";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <UserProvider>
      <WishlistDialogProvider>
        <SidebarProvider defaultOpen={false}>{props.children}</SidebarProvider>
      </WishlistDialogProvider>
    </UserProvider>
  );
}

export default Providers;
