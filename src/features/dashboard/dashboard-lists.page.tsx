import { useFetchWishlists } from "./model/useFetchWishlists";
import WishlistGalleryItem from "./ui/gallery-view/WishlistGalleryItem";
import { useDashboardContext } from "./ui/layouts/DashboardLayout";
import WishlistTableItem from "./ui/table-view/WishlistTableItem";

function WishlistsPage() {
  const { viewMode, dashboardUserId, searchString } = useDashboardContext();
  const { wishlists, isLoading, error } = useFetchWishlists(
    dashboardUserId,
    searchString
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Не удалось загрузить вишлисты ☹️</div>;

  if (wishlists && wishlists.length === 0) {
    return <div>Нет вишлистов 😶</div>;
  }
  if (wishlists && wishlists.length > 0)
    return (
      <div className="flex flex-col gap-0 md:gap-4">
        {viewMode === "gallery" && (
          <div className="gap-x-4 gap-y-3 md:gap-y-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {wishlists.map((wishlist) => (
              <WishlistGalleryItem wishlist={wishlist} key={wishlist.$id} />
            ))}
          </div>
        )}
        {viewMode === "table" &&
          wishlists.map((wishlist) => (
            <WishlistTableItem wishlist={wishlist} key={wishlist.$id} />
          ))}
      </div>
    );
}

export const Component = WishlistsPage;
