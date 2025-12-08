import type { CollaboratorType, Roles } from "@/features/collaborators";
import WishlistDialog from "@/features/wishlist/ui/wishlist-dialog/WishlistDialog";
import type { WishlistDocumentType } from "@/shared/types";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import {
  WishlistDialogContext,
  type WishlistDialogContextType,
} from "./Context";

type DialogState = {
  wishlist: WishlistDocumentType | null;
  action: "create" | "edit" | null;
  roles?: Roles;
  collaborators?: CollaboratorType[];
};

export function WishlistDialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    wishlist: null,
    action: null,
  });

  const openDialog: WishlistDialogContextType["openDialog"] = useCallback(
    (action, wishlist, roles, collaborators) => {
      setDialogState({
        action,
        wishlist: wishlist ?? null,
        roles,
        collaborators,
      });
    },
    []
  );

  const closeDialog = useCallback(() => {
    setDialogState({ wishlist: null, action: null });
  }, []);

  return (
    <WishlistDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {dialogState.action && (
        <WishlistDialog
          action={dialogState.action}
          wishlist={dialogState.wishlist}
          roles={dialogState.roles}
          collaborators={dialogState.collaborators}
          isOpen={true}
          setIsOpen={(open) => {
            if (!open) closeDialog();
          }}
        />
      )}
    </WishlistDialogContext.Provider>
  );
}
