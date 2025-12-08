import type { WishDocumentType } from "@/shared/types";

export type WishPickerContentProps = {
  wishes: WishDocumentType[];
  onPickWish: (wish: WishDocumentType, added: boolean) => void;
};
