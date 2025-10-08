import { useCollabWishlists } from "../model/useCollabWishlists";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function SharedPage() {
  const { searchString } = useDashboardContext();

  const {
    wishlists: collabWishlists,
    isLoading,
    error,
  } = useCollabWishlists({
    collabsOnly: true,
    searchString: searchString,
    order: "desc",
    orderBy: "$sequence",
  });

  return (
    <WishlistsPageLayout
      wishlists={collabWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = SharedPage;
