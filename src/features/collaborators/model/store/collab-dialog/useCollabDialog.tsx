import { useContext } from "react";
import { CollaboratorsDialogContext } from "./Context";

export function useCollaboratorsDialog() {
  const ctx = useContext(CollaboratorsDialogContext);

  if (!ctx)
    throw new Error(
      "useCollaboratorsDialogProvider должен использоваться только внутри CollaboratorsDialogProvider"
    );
  return ctx;
}
