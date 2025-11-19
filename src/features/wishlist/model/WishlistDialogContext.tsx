import WishlistDialog from "@/features/wishlist/ui/editor-dialog/WishlistDialog";
import type { WishlistDocumentType } from "@/shared/model/types";
import { useCallback, useState } from "react";

import type { Roles } from "@/features/collaborators";
import type { ReactNode } from "react";
import { WishlistDialogContext } from "./useWishlistDialog";

type DialogState = {
  wishlist: WishlistDocumentType | null;
  action: "create" | "edit" | null;
  roles?: Roles;
};

export type WishlistDialogContextType = {
  openDialog: (
    action: "create" | "edit",
    wishlist?: WishlistDocumentType,
    roles?: Roles
  ) => void;
  closeDialog: () => void;
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
