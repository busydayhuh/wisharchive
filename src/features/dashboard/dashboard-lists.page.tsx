import { useFetchWishlists } from "./model/useFetchWishlists";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function WishlistsPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const { wishlists, isLoading, error } = useFetchWishlists(
    dashboardUserId,
    searchString
  );

  return (
    <WishlistsPageLayout
      wishlists={wishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = WishlistsPage;
