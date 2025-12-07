import type { WishDocumentType } from "@/shared/model/types";

export type WishPickerContentProps = {
  wishes: WishDocumentType[];
  onPickWish: (wish: WishDocumentType, added: boolean) => void;
};
