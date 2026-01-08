import type {
  WishDocumentType,
  WishlistDocumentType,
  UserDocumentType,
} from "@/shared/types";

export type Category = "wishes" | "wishlists" | "users";
export type AnyDocument =
  | WishDocumentType
  | WishlistDocumentType
  | UserDocumentType;
