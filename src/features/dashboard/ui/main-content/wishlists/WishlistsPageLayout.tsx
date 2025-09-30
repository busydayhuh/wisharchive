import type { WishlistDocumentType } from "@/shared/model/types";
import Masonry from "react-masonry-css";
import { useDashboardContext } from "../../DashboardLayout";
import WishlistGalleryItem from "./items/WishlistGalleryItem";
import WishlistTableItem from "./items/WishlistTableItem";

function WishlistsPageLayout({
  wishlists,
  isLoading,
  error,
}: {
  wishlists?: WishlistDocumentType[];
  isLoading: boolean;
  error?: unknown;
}) {
  const { viewMode } = useDashboardContext();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Не удалось загрузить вишлисты ☹️</div>;

  if (wishlists && wishlists.length === 0) {
    return <div>Нет вишлистов 😶</div>;
  }
  if (wishlists && wishlists.length > 0) {
    if (viewMode === "gallery")
      return (
        <Masonry
          breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {wishlists.map((wishlist) => (
            <WishlistGalleryItem wishlist={wishlist} key={wishlist.$id} />
          ))}
        </Masonry>
      );

    if (viewMode === "table")
      return (
        <div className="flex flex-col md:-mt-2">
          {wishlists.map((wishlist) => (
            <WishlistTableItem wishlist={wishlist} key={wishlist.$id} />
          ))}
        </div>
      );
  }
}

export default WishlistsPageLayout;
