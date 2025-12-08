import type { WishlistDocumentType } from "@/shared/model/types";
import PageBoundary from "@/shared/ui/PageBoundary";
import { useParams } from "react-router";
import { useAuth } from "../auth";
import { ToolbarProvider, useAccess } from "../dashboard";
import { useWishlist } from "./model/hooks/useWishlist";
import { WishlistLayout } from "./ui/WishlistLayout";
import { WishlistSkeleton } from "./ui/WishlistSkeleton";

function WishlistPage() {
  const { listId } = useParams();
  const { wishlist, isLoading, error } = useWishlist(listId ?? null);
  const { isLoggedIn, userId } = useAuth();
  const { hasAccess, roles } = useAccess("wishlist", wishlist);

  return (
    <PageBoundary
      item={wishlist}
      isLoading={isLoading}
      error={error}
      isLoggedIn={isLoggedIn}
      userId={userId}
      hasAccess={hasAccess}
      skeleton={<WishlistSkeleton />}
    >
      {(safeItem) => (
        <ToolbarProvider
          dashboardType="list"
          localStorageKey={`list+${listId}}`}
        >
          <WishlistLayout
            wishlist={safeItem as WishlistDocumentType}
            roles={roles}
          />
        </ToolbarProvider>
      )}
    </PageBoundary>
  );
}

export const Component = WishlistPage;
