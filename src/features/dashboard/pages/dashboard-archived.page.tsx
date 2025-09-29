import { useWishes } from "@/features/wish";
import { useDashboardContext } from "../ui/DashboardLayout";
import { WishesPageLayout } from "../ui/main-content/wishes/WishesPageLayout";

function ArchivedWishesPage() {
  const { dashboardUserId, searchString, viewMode } = useDashboardContext();
  const { wishes, isLoading, error } = useWishes({
    ownerId: dashboardUserId,
    searchString: searchString,
    archived: true,
    order: "desc",
    orderBy: "$sequence",
  });

  return (
    <WishesPageLayout
      wishes={wishes}
      isLoading={isLoading}
      error={error}
      viewMode={viewMode}
    />
  );
}

export const Component = ArchivedWishesPage;
