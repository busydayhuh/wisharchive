import type { WishlistDocumentType } from "@/shared/model/types";
import WishlistGalleryItem from "../gallery-view/WishlistGalleryItem";
import WishlistTableItem from "../table-view/WishlistTableItem";
import { useDashboardContext } from "./DashboardLayout";

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
        <div className="gap-x-4 gap-y-3 grid grid-flow-col auto-cols-[minmax(150px,240px)]">
          {wishlists.map((wishlist) => (
            <WishlistGalleryItem wishlist={wishlist} key={wishlist.$id} />
          ))}
        </div>
      );

    if (viewMode === "table")
      return (
        <div className="flex flex-col gap-0 md:gap-4">
          {wishlists.map((wishlist) => (
            <WishlistTableItem wishlist={wishlist} key={wishlist.$id} />
          ))}
        </div>
      );
  }
}

export default WishlistsPageLayout;
