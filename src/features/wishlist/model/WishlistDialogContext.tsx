import WishlistDialog from "@/features/wishlist/ui/dialog/WishlistDialog";
import type { WishlistDocumentType } from "@/shared/model/types";
import { useCallback, useState } from "react";

import type { ReactNode } from "react";
import { WishlistDialogContext } from "./useWishlistDialog";

type DialogState = {
  wishlist: WishlistDocumentType | null;
  action: "create" | "edit" | null;
};

export type WishlistDialogContextType = {
  openDialog: (
    action: "create" | "edit",
    wishlist?: WishlistDocumentType
  ) => void;
  closeDialog: () => void;
};

export function WishlistDialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    wishlist: null,
    action: null,
  });

  const openDialog = useCallback(
    (action: "create" | "edit", wishlist?: WishlistDocumentType) => {
      setDialogState({
        action,
        wishlist: wishlist ?? null,
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
          isOpen={true}
          setIsOpen={(open) => {
            if (!open) closeDialog();
          }}
        />
      )}
    </WishlistDialogContext.Provider>
  );
}
