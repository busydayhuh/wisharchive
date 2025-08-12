import { useWishlists } from "../model/useWishlists";
import { useDashboardContext } from "../ui/common/DashboardLayout";
import WishlistsPageLayout from "../ui/wishlist/WishlistsPageLayout";

function SharedPage() {
  const { searchString, dashboardUserId } = useDashboardContext();
  const {
    wishlists: collabWishlists,
    isLoading,
    error,
  } = useWishlists(dashboardUserId ?? "", searchString);

  return (
    <WishlistsPageLayout
      wishlists={collabWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = SharedPage;
