import { useWishlists } from "@/features/wishlist";
import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";
import { useDashboardContext } from "../model/useDashboardContext";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function BookmarksPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useWishlists({
    bookmarkedBy: dashboardUserId,
    searchString: searchString,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 0,
  });

  return (
    <WishlistsPageLayout
      wishlists={bookmarkedWishlists}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const BookmarksPageWithLayout = wrapDashboardPage(BookmarksPage);
