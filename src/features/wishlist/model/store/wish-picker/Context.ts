import { createContext } from "react";

export type WishPickerContext = {
  pickerOpen: boolean;
  openPicker: () => void;
};
export const WishPickerContext = createContext<WishPickerContext | null>(null);
