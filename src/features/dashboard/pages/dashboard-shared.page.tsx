import { useMemo } from "react";
import { useCollabWishlists } from "../model/useCollabWishlists";
import { useDashboardToolbar } from "../model/useDashboardToolbar";
import { wrapDashboardPage } from "../model/wrapDashboardPage";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function SharedPage() {
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishlists, isLoading, error } = useCollabWishlists({
    searchString: searchString,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
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
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}

export const Component = wrapDashboardPage(SharedPage);
