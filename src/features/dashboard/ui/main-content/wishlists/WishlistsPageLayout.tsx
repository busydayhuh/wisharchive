import type { WishlistDocumentType } from "@/shared/model/types";
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
        <div className="gap-x-4 gap-y-3 grid grid-auto-fill">
          {wishlists.map((wishlist) => (
            <WishlistGalleryItem wishlist={wishlist} key={wishlist.$id} />
          ))}
        </div>
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
