import { useWishes } from "@/features/wish";
import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";
import { useDashboard } from "../model/store/dashboard/useDashboard";
import { useToolbar } from "../model/store/toolbar/useToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import { ContentLayout } from "../ui/content/ContentLayout";

function BookedPage() {
  const { dashboardOwnerId } = useDashboard();
  const { searchString, toolbarState } = useToolbar();

  const { wishes, isLoading, error, size, setSize, isValidating, reachedEnd } =
    useWishes(
      {
        bookerId: dashboardOwnerId,
        archived: false,
        searchString: searchString,
        sort: toolbarState.sort,
        filters: toolbarState.filters,
      },
      "booked",
      dashboardOwnerId
    );

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 0,
  });

  return (
    <ContentLayout
      items={wishes}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      type="wish"
    />
  );
}

export const BookedPageWithLayout = wrapDashboardPage(BookedPage);
