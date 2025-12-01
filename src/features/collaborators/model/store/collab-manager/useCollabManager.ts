import { useContext } from "react";
import { CollaboratorsManager } from "./Context";

export function useCollabManager() {
  const ctx = useContext(CollaboratorsManager);
  if (!ctx)
    throw new Error(
      "CollaboratorsPanelContext должен использоваться внутри провайдера"
    );
  return ctx;
}
