import { createContext, useContext } from "react";
import type { WishlistDialogContextType } from "./WishlistDialogContext";

export const WishlistDialogContext =
  createContext<WishlistDialogContextType | null>(null);

export function useWishlistDialog() {
  const ctx = useContext(WishlistDialogContext);

  if (!ctx)
    throw new Error(
      "useWishlistDialog должен использоваться только внутри WishlistDialogProvider"
    );

  return ctx;
}
