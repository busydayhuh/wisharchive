import { useWishes } from "@/features/wish";
import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";
import { useDashboardContext } from "../model/useDashboardContext";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import { WishesPageLayout } from "../ui/main-content/wishes/WishesPageLayout";

function ArchivedWishesPage() {
  const { dashboardUserId } = useDashboardContext();
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishes, isLoading, error, size, setSize, isValidating, reachedEnd } =
    useWishes({
      ownerId: dashboardUserId,
      searchString: searchString,
      archived: true,
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
      isValidating={isValidating}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(ArchivedWishesPage);
