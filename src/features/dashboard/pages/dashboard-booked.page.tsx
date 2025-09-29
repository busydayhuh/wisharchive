import { useWishes } from "@/features/wish";
import { useDashboardContext } from "../ui/DashboardLayout";
import { WishesPageLayout } from "../ui/main-content/wishes/WishesPageLayout";

function BookedPage() {
  const { dashboardUserId, searchString, viewMode } = useDashboardContext();
  const { wishes, isLoading, error } = useWishes({
    bookerId: dashboardUserId,
    archived: false,
    searchString: searchString,
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

export const Component = BookedPage;
