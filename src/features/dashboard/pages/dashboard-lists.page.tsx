import { useWishlists } from "@/features/wishlist";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function WishlistsPage() {
  const { dashboardUserId, searchString } = useDashboardContext();
  const { wishlists, isLoading, error } = useWishlists({
    ownerId: dashboardUserId,
    searchString: searchString,
    order: "desc",
    orderBy: "$sequence",
  });

  return (
    <WishlistsPageLayout
      wishlists={wishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = WishlistsPage;
