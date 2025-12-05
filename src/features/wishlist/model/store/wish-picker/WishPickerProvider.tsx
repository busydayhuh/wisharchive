import WishPicker from "@/features/wishlist/ui/wish-picker/WishPicker";
import { useCallback, useState, type ReactNode } from "react";
import { WishPickerContext } from "./Context";

export function WishPickerProvider({ children }: { children: ReactNode }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const openPicker = useCallback(() => setPickerOpen(true), [setPickerOpen]);

  return (
    <WishPickerContext.Provider value={{ pickerOpen, openPicker }}>
      {children}
      <WishPicker pickerOpen={pickerOpen} setPickerOpen={setPickerOpen} />
    </WishPickerContext.Provider>
  );
}
