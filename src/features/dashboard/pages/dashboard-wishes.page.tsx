import { useWishes } from "@/features/wish";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useDashboard } from "../model/store/dashboard/useDashboard";
import { useToolbar } from "../model/store/toolbar/useToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import { ContentLayout } from "../ui/content/ContentLayout";

function WishesPage() {
  const { dashboardOwnerId } = useDashboard();
  const { searchString, toolbarState } = useToolbar();

  const { wishes, isLoading, error, size, setSize, isValidating, reachedEnd } =
    useWishes(
      {
        ownerId: dashboardOwnerId,
        searchString: searchString,
        archived: false,
        sort: toolbarState.sort,
        filters: toolbarState.filters,
      },
      "main-wishes",
      dashboardOwnerId
    );

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 200,
  });

  return (
    <ContentLayout
      items={wishes}
      isLoading={isLoading}
      error={error}
      isValidating={isValidating}
      type="wish"
    />
  );
}

export const WishesPageWithLayout = wrapDashboardPage(WishesPage);
