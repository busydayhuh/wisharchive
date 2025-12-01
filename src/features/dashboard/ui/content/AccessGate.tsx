import type { Models } from "appwrite";
import { useAccess } from "../../model/hooks/useAccess";

export function AccessGate({
  type,
  item,
  children,
}: {
  type: "wish" | "wishlist";
  item: Models.Document;
  children: React.ReactNode;
}) {
  const { hasAccess } = useAccess(type, item);
  return hasAccess ? <>{children}</> : null;
}
