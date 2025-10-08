import { createContext, useContext } from "react";
import type { CollaboratorsDialogContextType } from "./CollaboratorsDialogContext";

export const CollaboratorsDialogContext =
  createContext<CollaboratorsDialogContextType | null>(null);

export function useCollaboratorsDialog() {
  const ctx = useContext(CollaboratorsDialogContext);

  if (!ctx)
    throw new Error(
      "useCollaboratorsDialogProvider должен использоваться только внутри CollaboratorsDialogProvider"
    );

  return ctx;
}
