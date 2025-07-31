import { useUser } from "../auth";
import { useFetchWishlists } from "./model/useFetchWishlists";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function BookmarksPage() {
  const { current } = useUser();
  const { searchString } = useDashboardContext();
  const {
    wishlists: bookmarkedWishlists,
    isLoading,
    error,
  } = useFetchWishlists(current!.$id, searchString, "bookmarkedLists");

  return (
    <WishlistsPageLayout
      wishlists={bookmarkedWishlists}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = BookmarksPage;
