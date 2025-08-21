import type { Models } from "appwrite";
import { createContext, useContext } from "react";

export type SelectedRole = "editors" | "readers";

type CollaboratorsContextType = {
  wishlistId: string;
  selectedRole: SelectedRole;
  setSelectedRole: (role: SelectedRole) => void;
  addMember: (
    userId: string,
    email: string
  ) => Promise<Models.Membership | undefined>;
  deleteMember: (userId: string) => Promise<unknown>;
};

export const CollaboratorsContext =
  createContext<CollaboratorsContextType | null>(null);

export function useCollaboratorsContext() {
  const ctx = useContext(CollaboratorsContext);
  if (!ctx)
    throw new Error(
      "useCollaboratorsContext должен использоваться внутри провайдера"
    );
  return ctx;
}
