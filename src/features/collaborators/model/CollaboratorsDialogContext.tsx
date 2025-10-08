import { useCallback, useState, type ReactNode } from "react";
import { CollaboratorsDialog } from "../ui/dialog/CollaboratorsDialog";
import { CollaboratorsDialogContext } from "./useCollaboratorsDialog";

export type CollaboratorsDialogContextType = {
  openCollabDialog: (wishlistId: string, isPrivateChecked?: boolean) => void;
  closeCollabDialog: () => void;
};
type CollaboratorsDialogState = {
  open: boolean;
  wishlistId: string;
  isPrivateChecked?: boolean;
};

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
