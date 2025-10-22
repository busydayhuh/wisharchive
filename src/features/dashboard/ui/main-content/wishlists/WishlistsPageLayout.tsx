import type { WishlistDocumentType } from "@/shared/model/types";
import Masonry from "react-masonry-css";
import WishlistGalleryItem from "./WishlistGalleryItem";
import WishlistTableItem from "./WishlistTableItem";

function WishlistsPageLayout({
  wishlists,
  isLoading,
  isValidating,
  error,
  viewMode,
}: {
  wishlists?: WishlistDocumentType[];
  isLoading: boolean;
  isValidating: boolean;
  viewMode: "gallery" | "table";
  error?: unknown;
}) {
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
          {isValidating && <div>Подгрузка...</div>}
        </Masonry>
      );

    if (viewMode === "table")
      return (
        <div className="flex flex-col md:-mt-2">
          {wishlists.map((wishlist) => (
            <WishlistTableItem wishlist={wishlist} key={wishlist.$id} />
          ))}
          {isValidating && <div>Подгрузка...</div>}
        </div>
      );
  }
}

export default WishlistsPageLayout;
