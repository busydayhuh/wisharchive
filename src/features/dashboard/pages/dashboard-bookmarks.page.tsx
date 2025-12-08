import { useWishlists } from "@/features/wishlist";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useDashboard } from "../model/store/dashboard/useDashboard";
import { useToolbar } from "../model/store/toolbar/useToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import { ContentLayout } from "../ui/content/ContentLayout";

function BookmarksPage() {
  const { dashboardOwnerId } = useDashboard();
  const { searchString, toolbarState } = useToolbar();

  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useWishlists(
    {
      bookmarkedBy: dashboardOwnerId,
      searchString: searchString,
      sort: toolbarState.sort,
      filters: toolbarState.filters,
    },
    "bookmarks",
    dashboardOwnerId
  );

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 0,
  });

  return (
    <ContentLayout
      items={bookmarkedWishlists}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      type="wishlist"
    />
  );
}

export const BookmarksPageWithLayout = wrapDashboardPage(BookmarksPage);
