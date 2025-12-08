import { useWishlists } from "@/features/wishlist";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useDashboard } from "../model/store/dashboard/useDashboard";
import { useToolbar } from "../model/store/toolbar/useToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import { ContentLayout } from "../ui/content/ContentLayout";

function WishlistsPage() {
  const { dashboardOwnerId } = useDashboard();
  const { searchString, toolbarState } = useToolbar();

  const {
    wishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useWishlists(
    {
      ownerId: dashboardOwnerId,
      searchString: searchString,
      sort: toolbarState.sort,
      filters: toolbarState.filters,
    },
    "main",
    dashboardOwnerId
  );

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 500,
  });

  return (
    <ContentLayout
      items={wishlists}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      type="wishlist"
    />
  );
}

export const WishlistPageWithLayout = wrapDashboardPage(WishlistsPage);
