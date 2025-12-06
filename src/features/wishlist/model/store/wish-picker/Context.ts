import { createContext } from "react";

export type WishPickerContext = {
  pickerOpen: boolean;
  openPicker: (id?: string) => void;
};
export const WishPickerContext = createContext<WishPickerContext | null>(null);
