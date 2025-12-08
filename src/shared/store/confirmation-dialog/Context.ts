import { createContext } from "react";
import type { OpenConfDialogProps } from "./ConfirmationDialogProvider";

export type ConfirmationDialogContextType = {
  openConfDialog: (props: OpenConfDialogProps) => void;
  closeConfDialog: () => void;
};
export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextType | null>(null);
