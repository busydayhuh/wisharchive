import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useMemo } from "react";
import { useCollabWishlists } from "../model/hooks/useCollabWishlists";
import { useDashboard } from "../model/store/dashboard/useDashboard";
import { useToolbar } from "../model/store/toolbar/useToolbar";
import { ContentLayout } from "../ui/content/ContentLayout";
import { wrapDashboardPage } from "../ui/wrapDashboardPage";

function SharedPage() {
  const { searchString, toolbarState } = useToolbar();
  const { dashboardOwnerId } = useDashboard();

  const {
    wishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useCollabWishlists(
    {
      searchString: searchString,
      sort: toolbarState.sort,
      filters: toolbarState.filters,
    },
    "collaborative",
    dashboardOwnerId
  );

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 0,
  });

  const collabWishlists = useMemo(
    () =>
      wishlists?.filter(
        (wl) => wl.editorsIds.length > 0 || wl.readersIds.length > 0
      ),
    [wishlists]
  );

  return (
    <ContentLayout
      items={collabWishlists}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      type="wishlist"
    />
  );
}

export const Component = wrapDashboardPage(SharedPage);
