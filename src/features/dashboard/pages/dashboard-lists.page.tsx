import { useWishlists } from "@/features/wishlist";
import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";
import { useDashboardContext } from "../model/useDashboardContext";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function WishlistsPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const {
    wishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useWishlists({
    ownerId: dashboardUserId,
    searchString: searchString,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 500,
  });

  return (
    <WishlistsPageLayout
      wishlists={wishlists}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(WishlistsPage);
