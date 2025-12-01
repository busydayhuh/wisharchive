import { createContext } from "react";

export type SelectedRole = "editors" | "readers";

type CollaboratorsManager = {
  wishlistId: string;
  selectedRole: SelectedRole;
  setSelectedRole: (role: SelectedRole) => void;
  onAddMember: (userId: string, email: string) => Promise<void>;
  onDeleteMember: (userId: string) => Promise<unknown>;
};

export const CollaboratorsManager = createContext<CollaboratorsManager | null>(
  null
);
