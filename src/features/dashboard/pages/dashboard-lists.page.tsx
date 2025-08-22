import { useWishlists } from "../model/useWishlists";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function WishlistsPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const { wishlists, isLoading, error } = useWishlists(
    dashboardUserId ?? "",
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
