import { useContext } from "react";
import { WishPickerContext } from "./Context";

export function useWishPicker() {
  const ctx = useContext(WishPickerContext);
  if (!ctx) {
    throw new Error("useWishPicker must be used inside WishPickerContext");
  }
  return ctx;
}
