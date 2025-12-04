import type { Models } from "appwrite";
import { useAccess } from "../../model/hooks/useAccess";
import { RolesContext } from "../../model/store/access/Context";

export function AccessGate({
  type,
  item,
  children,
}: {
  type: "wish" | "wishlist";
  item: Models.Document;
  children: React.ReactNode;
}) {
  const { hasAccess, roles } = useAccess(type, item);
  if (!hasAccess) return null;

  return (
    <RolesContext.Provider value={roles}>{children}</RolesContext.Provider>
  );
}
