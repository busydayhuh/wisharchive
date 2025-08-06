import { useFetchWishlists } from "./model/useFetchWishlists";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function SharedPage() {
  const { searchString, dashboardUserId, path } = useDashboardContext();
  const {
    wishlists: collabWishlists,
    isLoading,
    error,
  } = useFetchWishlists(dashboardUserId, path, searchString);

  return (
    <WishlistsPageLayout
      wishlists={collabWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = SharedPage;
