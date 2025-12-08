import type { AccessRoles } from "@/features/collaborators";
import { DashboardLayout } from "@/features/dashboard";
import type { WishlistDocumentType } from "@/shared/types";
import { WishlistContent } from "./WishlistContent";
import { WishlistHeader } from "./WishlistHeader";

export function WishlistLayout({
  wishlist,
  roles,
}: {
  wishlist: WishlistDocumentType;
  roles?: AccessRoles;
}) {
  return (
    <DashboardLayout
      header={<WishlistHeader wishlist={wishlist} userRoles={roles} />}
    >
      <WishlistContent wishlistId={wishlist.$id} />
    </DashboardLayout>
  );
}
