import { useDashboardContext } from "@/features/dashboard/model/useDashboardContext";
import { useWishlistDialog } from "@/features/wishlist";
import { cn } from "@/shared/lib/css";
import type { WishlistDocumentType } from "@/shared/model/types";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import Masonry from "react-masonry-css";
import WishlistGalleryItem from "./WishlistGalleryItem";
import { WishlistsSkeleton } from "./WishlistsSkeleton";
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
  const { isDashboardOwner } = useDashboardContext();
  const { openDialog } = useWishlistDialog();

  // изначальная загрузка (скелетон)
  if (isLoading && !wishlists)
    return viewMode === "gallery" ? (
      <Masonry
        breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {[...Array(5)].map((_, index) => (
          <WishlistsSkeleton
            viewMode={viewMode}
            key={"wishlist-skeleton-" + index}
          />
        ))}
      </Masonry>
    ) : (
      <div className="flex flex-col gap-1 md:gap-2 -mt-2">
        {[...Array(5)].map((_, index) => (
          <WishlistsSkeleton
            viewMode={viewMode}
            key={"wishlist-skeleton-" + index}
          />
        ))}
      </div>
    );

  // ошибка запроса
  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message="Что-то пошло не так"
        description="Не удалось загрузить списки желаний, повторите попытку позже"
      />
    );

  // нет вишлистов
  if (wishlists && wishlists.length === 0) {
    return (
      <ErrorMessage
        variant="no-items"
        message="Нет списков"
        description={
          isDashboardOwner
            ? "Нет списков, соответствующих вашему запросу, или вы ещё не создали ни одного списка желаний"
            : "Нет списков, соответствующих вашему запросу"
        }
        withButton={isDashboardOwner}
        buttonText="Создать список"
        action={() => openDialog("create")}
      />
    );
  }

  // вишлисты (при повторном loading при поиске/сортировке оставляет старые значения с opacity-60)
  if (wishlists && wishlists.length > 0) {
    return viewMode === "gallery" ? (
      <Masonry
        breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
        className={cn("my-masonry-grid", isLoading && "opacity-60")}
        columnClassName="my-masonry-grid_column"
      >
        {wishlists.map((wishlist) => (
          <WishlistGalleryItem wishlist={wishlist} key={wishlist.$id} />
        ))}

        {/* infinite загрузка */}
        {isValidating && <WishlistsSkeleton viewMode={viewMode} />}
      </Masonry>
    ) : (
      <div className={cn("flex flex-col md:-mt-2", isLoading && "opacity-60")}>
        {wishlists.map((wishlist) => (
          <WishlistTableItem wishlist={wishlist} key={wishlist.$id} />
        ))}

        {/* infinite загрузка */}
        {isValidating && <WishlistsSkeleton viewMode={viewMode} />}
      </div>
    );
  }
}

export default WishlistsPageLayout;
