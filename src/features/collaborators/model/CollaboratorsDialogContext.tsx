import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CollaboratorsDialog } from "../ui/dialog/CollaboratorsDialog";

type CollaboratorsDialogContextType = {
  openCollabDialog: (wishlistId: string, isPrivateChecked?: boolean) => void;
  closeCollabDialog: () => void;
};
type CollaboratorsDialogState = {
  open: boolean;
  wishlistId: string;
  isPrivateChecked?: boolean;
};

const CollaboratorsDialogContext =
  createContext<CollaboratorsDialogContextType | null>(null);

export function CollaboratorsDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dialogState, setDialogState] =
    useState<CollaboratorsDialogState | null>(null);

  const openCollabDialog = useCallback(
    (wishlistId: string, isPrivateChecked?: boolean) => {
      setDialogState({ open: true, wishlistId, isPrivateChecked });
    },
    []
  );

  const closeCollabDialog = useCallback(() => {
    setDialogState(null);
  }, []);

  return (
    <CollaboratorsDialogContext.Provider
      value={{ openCollabDialog, closeCollabDialog }}
    >
      {children}

      {dialogState && (
        <CollaboratorsDialog
          {...dialogState}
          onOpenChange={(open) => {
            if (!open) closeCollabDialog();
          }}
        />
      )}
    </CollaboratorsDialogContext.Provider>
  );
}

export function useCollaboratorsDialog() {
  const ctx = useContext(CollaboratorsDialogContext);

  if (!ctx)
    throw new Error(
      "useCollaboratorsDialogProvider должен использоваться только внутри CollaboratorsDialogProvider"
    );

  return ctx;
}
