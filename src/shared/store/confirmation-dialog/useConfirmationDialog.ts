import { useContext } from "react";
import { ConfirmationDialogContext } from "./Context";

export function useConfirmationDialog() {
  const ctx = useContext(ConfirmationDialogContext);

  if (!ctx)
    throw new Error(
      "useConfirmationDialogProvider должен использоваться только внутри ConfirmationDialogProvider"
    );

  return ctx;
}
