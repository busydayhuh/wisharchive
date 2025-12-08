import type { Roles } from "@/features/collaborators";
import type { WishlistDocumentType } from "@/shared/model/types";
import { createContext } from "react";

export type WishlistDialogContextType = {
  openDialog: (
    action: "create" | "edit",
    wishlist?: WishlistDocumentType,
    roles?: Roles
  ) => void;
  closeDialog: () => void;
};

export const WishlistDialogContext =
  createContext<WishlistDialogContextType | null>(null);
