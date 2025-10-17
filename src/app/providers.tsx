import { UserProvider } from "@/features/auth";
import { RouteContextProvider } from "@/features/breadcrumbs";
import { CollaboratorsDialogProvider } from "@/features/collaborators";
import { WishlistDialogProvider } from "@/features/wishlist";
import { ConfirmationDialogProvider } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <UserProvider key="root-providers">
      <RouteContextProvider>
        <SidebarProvider defaultOpen={false}>
          <ConfirmationDialogProvider>
            <CollaboratorsDialogProvider>
              <WishlistDialogProvider>{props.children}</WishlistDialogProvider>
            </CollaboratorsDialogProvider>
          </ConfirmationDialogProvider>
        </SidebarProvider>
      </RouteContextProvider>
    </UserProvider>
  );
}

export default Providers;
