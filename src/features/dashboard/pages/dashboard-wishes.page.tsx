import { useWishes } from "@/features/wish";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { useDashboardContext } from "../ui/DashboardLayout";
import { WishesPageLayout } from "../ui/main-content/wishes/WishesPageLayout";
import { wrapDashboardPage } from "../model/wrapDashboardPage";

function WishesPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishes, isLoading, error } = useWishes({
    ownerId: dashboardUserId,
    searchString: searchString,
    archived: false,
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

export const Component = wrapDashboardPage(WishesPage);
