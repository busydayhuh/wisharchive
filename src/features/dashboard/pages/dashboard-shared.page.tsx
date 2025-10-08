import { useMemo } from "react";
import { useCollabWishlists } from "../model/useCollabWishlists";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function SharedPage() {
  const { searchString } = useDashboardContext();

  const { wishlists, isLoading, error } = useCollabWishlists({
    collabsOnly: true,
    searchString: searchString,
    order: "desc",
    orderBy: "$sequence",
  });

  const collabWishlists = useMemo(
    () =>
      wishlists?.filter(
        (wl) => wl.editorsIds.length > 0 || wl.readersIds.length > 0
      ),
    [wishlists]
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
