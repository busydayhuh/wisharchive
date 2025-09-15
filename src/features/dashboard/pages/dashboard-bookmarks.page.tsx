import { useWishlists } from "@/features/wishlist";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function BookmarksPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
  } = useWishlists(dashboardUserId ?? null, searchString);

  return (
    <WishlistsPageLayout
      wishlists={bookmarkedWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = BookmarksPage;
