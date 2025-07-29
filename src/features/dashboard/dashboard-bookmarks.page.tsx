import type { WishlistDocumentType } from "@/shared/model/types";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistsPageLayout from "./ui/layouts/WishlistsPageLayout";

function BookmarksPage() {
  const { searchString, dashboardUser } = useDashboardContext();
  const { user, isLoading, error } = dashboardUser;

  let filteredBookmarks = [] as WishlistDocumentType[];

  if (user && user.favoriteWishlists) {
    filteredBookmarks = user.favoriteWishlists.filter(({ title }) =>
      title.includes(searchString)
    );
  }

  return (
    <WishlistsPageLayout
      wishlists={filteredBookmarks}
      isLoading={isLoading}
      error={error}
    />
  );
}

export const Component = BookmarksPage;
