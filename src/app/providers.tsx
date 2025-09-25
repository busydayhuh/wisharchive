import { UserProvider } from "@/features/auth";
import { WishlistDialogProvider } from "@/features/wishlist";
import { ConfirmationDialogProvider } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <UserProvider>
      <SidebarProvider defaultOpen={false}>
        <ConfirmationDialogProvider>
          <WishlistDialogProvider>{props.children}</WishlistDialogProvider>
        </ConfirmationDialogProvider>
      </SidebarProvider>
    </UserProvider>
  );
}

export default Providers;
