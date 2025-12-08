import type { Roles } from "@/features/collaborators";
import WishlistDialog from "@/features/wishlist/ui/wishlist-dialog/WishlistDialog";
import type { WishlistDocumentType } from "@/shared/model/types";
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
};

export function WishlistDialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    wishlist: null,
    action: null,
  });

  const openDialog: WishlistDialogContextType["openDialog"] = useCallback(
    (action, wishlist, roles) => {
      setDialogState({
        action,
        wishlist: wishlist ?? null,
        roles,
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
          isOpen={true}
          setIsOpen={(open) => {
            if (!open) closeDialog();
          }}
        />
      )}
    </WishlistDialogContext.Provider>
  );
}
