import { useWishes } from "@/features/wish";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { useDashboardContext } from "../ui/DashboardLayout";
import { WishesPageLayout } from "../ui/main-content/wishes/WishesPageLayout";

function ArchivedWishesPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishes, isLoading, error } = useWishes({
    ownerId: dashboardUserId,
    searchString: searchString,
    archived: true,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });

  return (
    <WishesPageLayout
      wishes={wishes}
      isLoading={isLoading}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = ArchivedWishesPage;
