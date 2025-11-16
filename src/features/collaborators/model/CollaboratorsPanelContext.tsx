import { createContext, useContext } from "react";

export type SelectedRole = "editors" | "readers";

type CollaboratorsPanelContextType = {
  wishlistId: string;
  selectedRole: SelectedRole;
  setSelectedRole: (role: SelectedRole) => void;
  onAddMember: (userId: string, email: string) => Promise<void>;
  onDeleteMember: (userId: string) => Promise<unknown>;
};

export const CollaboratorsPanelContext =
  createContext<CollaboratorsPanelContextType | null>(null);

export function useCollaboratorsDialogContext() {
  const ctx = useContext(CollaboratorsPanelContext);
  if (!ctx)
    throw new Error(
      "CollaboratorsPanelContext должен использоваться внутри провайдера"
    );
  return ctx;
}
