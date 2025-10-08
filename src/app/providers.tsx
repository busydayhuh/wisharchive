import { UserProvider } from "@/features/auth";
import { CollaboratorsDialogProvider } from "@/features/collaborators";
import { ConfirmationDialogProvider } from "@/shared/model/confirmation-dialog/ConfirmationDialogContext";
import { SidebarProvider } from "@/shared/ui/kit/sidebar";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return (
    <UserProvider>
      <SidebarProvider defaultOpen={false}>
        <ConfirmationDialogProvider>
          <CollaboratorsDialogProvider>
            {props.children}
          </CollaboratorsDialogProvider>
        </ConfirmationDialogProvider>
      </SidebarProvider>
    </UserProvider>
  );
}

export default Providers;
