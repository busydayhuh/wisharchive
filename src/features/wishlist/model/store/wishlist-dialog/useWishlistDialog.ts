import { useContext } from "react";
import { WishlistDialogContext } from "./Context";

export function useWishlistDialog() {
  const ctx = useContext(WishlistDialogContext);

  if (!ctx)
    throw new Error(
      "useWishlistDialog должен использоваться только внутри WishlistDialogProvider"
    );

  return ctx;
}
