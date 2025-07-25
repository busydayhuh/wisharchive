import { useFetchCollabWishlists } from "./model/useFetchWishlists";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function SharedPage() {
  const { searchString, dashboardUserId } = useDashboardContext();
  const { collabWishlists, isLoading, error } = useFetchCollabWishlists(
    dashboardUserId,
    searchString
  );

  return (
    <WishlistsPageLayout
      wishlists={collabWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = SharedPage;
