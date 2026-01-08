import { useCallback, useState, type ReactNode } from "react";
import WishPicker from "../../../ui/wish-picker/WishPicker";
import { WishPickerContext } from "./Context";

export function WishPickerProvider({ children }: { children: ReactNode }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [wishlistId, setWishlistId] = useState("");

  const openPicker = useCallback(
    (wishlistId?: string) => {
      if (!wishlistId) return;

      setPickerOpen(true);
      setWishlistId(wishlistId);
    },
    [setPickerOpen, setWishlistId]
  );

  return (
    <WishPickerContext.Provider value={{ pickerOpen, openPicker }}>
      {children}
      <WishPicker
        pickerOpen={pickerOpen}
        setPickerOpen={setPickerOpen}
        wishlistId={wishlistId}
      />
    </WishPickerContext.Provider>
  );
}
