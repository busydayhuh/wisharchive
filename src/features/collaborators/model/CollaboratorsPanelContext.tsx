import type { Models } from "appwrite";
import { createContext, useContext } from "react";

export type SelectedRole = "editors" | "readers";

type CollaboratorsPanelContextType = {
  wishlistId: string;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  addMember: (
    userId: string,
    email: string
  ) => Promise<Models.Membership | undefined>;
  deleteMember: (userId: string) => Promise<unknown>;
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
