import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

type DialogState = {
  wishlistId: string | null;
  action: "create" | "edit" | null;
};

export type WishlistDialogContextType = {
  openDialog: (action: "create" | "edit", wishlistId?: string) => void;
  closeDialog: () => void;
};

const WishlistDialogContext = createContext<WishlistDialogContextType | null>(
  null
);

const DialogLazy = lazy(() => import("@/features/wishlist/ui/WishlistDialog"));

export function WishlistDialogProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState<DialogState>({
    wishlistId: null,
    action: null,
  });

  const openDialog = useCallback(
    (action: "create" | "edit", wishlistId?: string) => {
      setDialogState({
        action,
        wishlistId: wishlistId ?? null,
      });
    },
    []
  );

  const closeDialog = useCallback(() => {
    setDialogState({ wishlistId: null, action: null });
  }, []);

  return (
    <WishlistDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {dialogState.action && (
        <Suspense fallback={null}>
          <DialogLazy
            action={dialogState.action}
            wishlistId={dialogState.wishlistId ?? null}
            isOpen={true}
            setIsOpen={(open) => {
              if (!open) closeDialog();
            }}
          />
        </Suspense>
      )}
    </WishlistDialogContext.Provider>
  );
}

export function useWishlistDialog() {
  const ctx = useContext(WishlistDialogContext);

  if (!ctx)
    throw new Error(
      "useWishlistDialog должен использоваться только внутри WishlistDialogProvider"
    );

  return ctx;
}
