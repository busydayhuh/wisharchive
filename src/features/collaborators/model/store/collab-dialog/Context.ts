import { createContext } from "react";
import type { CollaboratorsDialogContextType } from "./Provider";

export const CollaboratorsDialogContext =
  createContext<CollaboratorsDialogContextType | null>(null);
