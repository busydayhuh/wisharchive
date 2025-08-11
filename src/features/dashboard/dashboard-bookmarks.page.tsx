import { useWishlists } from "./model/useWishlists";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function BookmarksPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
  } = useWishlists(dashboardUserId ?? "", searchString);

  return (
    <WishlistsPageLayout
      wishlists={bookmarkedWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = BookmarksPage;
