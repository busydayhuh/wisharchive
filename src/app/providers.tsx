import { UserProvider } from "@/features/auth";
import { RouteContextProvider } from "@/features/breadcrumbs";
import { CollaboratorsDialogProvider } from "@/features/collaborators";
import { WishlistDialogProvider } from "@/features/wishlist";
import { SWRConfigProvider } from "@/shared/store/SWRConfigProvider";
import { ConfirmationDialogProvider } from "@/shared/store/confirmation-dialog/ConfirmationDialogProvider";
import { ThemeProvider } from "@/shared/store/theme/ThemeProvider";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <SWRConfigProvider key="root-providers">
      <ThemeProvider>
        <UserProvider>
          <RouteContextProvider>
            <SidebarProvider defaultOpen={false}>
              <ConfirmationDialogProvider>
                <CollaboratorsDialogProvider>
                  <WishlistDialogProvider>
                    {props.children}
                  </WishlistDialogProvider>
                </CollaboratorsDialogProvider>
              </ConfirmationDialogProvider>
            </SidebarProvider>
          </RouteContextProvider>
        </UserProvider>
      </ThemeProvider>
    </SWRConfigProvider>
  );
}

export default Providers;
