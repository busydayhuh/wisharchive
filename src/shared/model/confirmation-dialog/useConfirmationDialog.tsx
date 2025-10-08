import { createContext, useContext } from "react";
import type { ConfirmationDialogContextType } from "./ConfirmationDialogContext";

export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextType | null>(null);

export function useConfirmationDialog() {
  const ctx = useContext(ConfirmationDialogContext);

  if (!ctx)
    throw new Error(
      "useConfirmationDialogProvider должен использоваться только внутри ConfirmationDialogProvider"
    );

  return ctx;
}
