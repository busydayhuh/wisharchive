import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";
import { useMemo } from "react";
import { useCollabWishlists } from "../model/useCollabWishlists";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function SharedPage() {
  const { searchString, toolbarState } = useDashboardToolbar();

  const {
    wishlists,
    isLoading,
    error,
    size,
    setSize,
    isValidating,
    reachedEnd,
  } = useCollabWishlists({
    searchString: searchString,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });

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
    <WishlistsPageLayout
      wishlists={collabWishlists}
      isLoading={isLoading}
      isValidating={isValidating}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(SharedPage);
