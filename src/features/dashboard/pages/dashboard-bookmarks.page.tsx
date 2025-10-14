import { useWishlists } from "@/features/wishlist";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";
import { wrapDashboardPage } from "../model/wrapDashboardPage";

function BookmarksPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
  } = useWishlists({
    bookmarkedBy: dashboardUserId,
    searchString: searchString,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });

  return (
    <WishlistsPageLayout
      wishlists={bookmarkedWishlists}
      isLoading={isLoading}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(BookmarksPage);
