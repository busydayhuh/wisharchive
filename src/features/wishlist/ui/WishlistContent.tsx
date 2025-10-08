import {
  DashboardContentContainer,
  WishesPageLayout,
} from "@/features/dashboard";
import { useWishes } from "@/features/wish";

export function WishlistContent({
  wishlistId,
  searchString,
  viewMode,
}: {
  wishlistId: string;
  searchString: string;
  viewMode: "gallery" | "table";
}) {
  const { wishes, isLoading, error } = useWishes({
    searchString: searchString,
    wishlistId: wishlistId,
    archived: false,
    order: "desc",
    orderBy: "$sequence",
  });
  return (
    <DashboardContentContainer>
      <WishesPageLayout
        wishes={wishes}
        isLoading={isLoading}
        error={error}
        viewMode={viewMode}
      />
    </DashboardContentContainer>
  );
}
