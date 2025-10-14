import { useWishlists } from "@/features/wishlist";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";
import { wrapDashboardPage } from "../model/wrapDashboardPage";

function WishlistsPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishlists, isLoading, error } = useWishlists({
    ownerId: dashboardUserId,
    searchString: searchString,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });

  return (
    <WishlistsPageLayout
      wishlists={wishlists}
      isLoading={isLoading}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(WishlistsPage);
