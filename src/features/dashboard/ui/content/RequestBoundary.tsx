import { useWishlistDialog } from "@/features/wishlist";
import { ROUTES } from "@/shared/config/routes";
import { ErrorMessage } from "@/shared/ui/components/ErrorMessage";
import type { Models } from "appwrite";
import { useNavigate } from "react-router";
import { useDashboard } from "../../model/store/dashboard/useDashboard";
import { useToolbar } from "../../model/store/toolbar/useToolbar";
import { ContentGrid } from "./ContentGrid";
import { WishesSkeleton } from "./wishes/WishesSkeleton";
import { WishlistsSkeleton } from "./wishlists/WishlistsSkeleton";

type RequestBoundaryProps = {
  items?: Models.Document[];
  type: "wish" | "wishlist";
  isLoading: boolean;
  error?: unknown;
  viewMode: "gallery" | "table";
  children: (safeItems: Models.Document[]) => React.ReactNode;
};

export function RequestBoundary({
  items,
  type,
  isLoading,
  viewMode,
  error,
  children,
}: RequestBoundaryProps) {
  const { isDashboardOwner, dashboardType } = useDashboard();
  const { hasActiveFilters } = useToolbar();
  const { openDialog } = useWishlistDialog();
  const navigate = useNavigate();
  const hasCreateBtn = ["wishes", "lists", "list"];

  if (isLoading && !items)
    return (
      <ContentGrid viewMode={viewMode}>
        {[...Array(5)].map((_, index) => (
          <ItemSkeleton
            viewMode={viewMode}
            type={type}
            key={"item-skeleton-" + index}
          />
        ))}
      </ContentGrid>
    );
  if (error) return <ErrorMessage variant="default" />;
  if (items && items.length === 0) {
    return (
      <ErrorMessage
        variant={hasActiveFilters ? "no-results" : "no-items"}
        entity={type === "wish" ? "wishes" : "wishlists"}
        withButton={isDashboardOwner && hasCreateBtn.includes(dashboardType)}
        action={() =>
          type === "wish" ? navigate(ROUTES.ADD) : openDialog("create")
        }
      />
    );
  }
  if (items) return children(items);
}

export function ItemSkeleton({
  type,
  viewMode,
}: {
  type: "wishlist" | "wish";
  viewMode: "gallery" | "table";
}) {
  return type === "wish" ? (
    <WishesSkeleton viewMode={viewMode} />
  ) : (
    <WishlistsSkeleton viewMode={viewMode} />
  );
}
