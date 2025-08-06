import { useFetchWishlists } from "./model/useFetchWishlists";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function BookmarksPage() {
  const { dashboardUserId, searchString, path } = useDashboardContext();
  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
  } = useFetchWishlists(dashboardUserId, path, searchString);

  return (
    <WishlistsPageLayout
      wishlists={bookmarkedWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = BookmarksPage;
