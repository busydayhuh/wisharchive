import type { CollaboratorType, Roles } from "@/features/collaborators/model";
import type { WishlistDocumentType } from "@/shared/types";
import { createContext } from "react";

export type WishlistDialogContextType = {
  openDialog: (
    action: "create" | "edit",
    wishlist?: WishlistDocumentType,
    roles?: Roles,
    collaborators?: CollaboratorType[]
  ) => void;
  closeDialog: () => void;
};

export const WishlistDialogContext =
  createContext<WishlistDialogContextType | null>(null);
