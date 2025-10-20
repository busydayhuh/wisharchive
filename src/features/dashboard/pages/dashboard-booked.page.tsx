import { useWishes } from "@/features/wish";
import { useDashboardContext } from "../model/useDashboardContext";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import { WishesPageLayout } from "../ui/main-content/wishes/WishesPageLayout";
import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";

function BookedPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishes, isLoading, error, size, setSize, isValidating, reachedEnd } =
    useWishes({
      bookerId: dashboardUserId,
      archived: false,
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
    <WishesPageLayout
      wishes={wishes}
      isLoading={isLoading}
      error={error}
      isValidating={isValidating}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(BookedPage);
