import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import { useAccess } from "../../model/useAccess";

export function AccessWrapper({
  type,
  item,
  children,
}: {
  type: "wish" | "wishlist";
  item: WishDocumentType | WishlistDocumentType;
  children: React.ReactNode;
}) {
  const { hasAccess } = useAccess(type, item);
  return hasAccess ? <div>{children}</div> : null;
}
