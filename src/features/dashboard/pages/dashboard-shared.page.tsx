import { useAuth } from "@/features/auth";
import { useCollabWishlists } from "../model/useCollabWishlists";
import { useDashboardContext } from "../ui/DashboardLayout";
import WishlistsPageLayout from "../ui/main-content/wishlists/WishlistsPageLayout";

function SharedPage() {
  const { searchString } = useDashboardContext();
  const { current } = useAuth();

  const {
    wishlists: collabWishlists,
    isLoading,
    error,
  } = useCollabWishlists(current?.$id ?? null, searchString);

  return (
    <WishlistsPageLayout
      wishlists={collabWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = SharedPage;
