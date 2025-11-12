import { useDashboardContext } from "@/features/dashboard/model/useDashboardContext";
import { useDashboardToolbar } from "@/features/dashboard/model/useDashboardToolbar";
import { useWishlistDialog } from "@/features/wishlist";
import { cn } from "@/shared/lib/css";
import type { WishlistDocumentType } from "@/shared/model/types";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { AccessWrapper } from "../AccessWrapper";
import { AnimationsWrapper } from "../AnimationsWrapper";
import { DashboardGrid } from "../DashboardGrid";
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
  const { hasActiveFilters } = useDashboardToolbar();
  const { openDialog } = useWishlistDialog();

  // изначальная загрузка (скелетон)
  if (isLoading && !wishlists)
    return (
      <DashboardGrid viewMode={viewMode}>
        {[...Array(5)].map((_, index) => (
          <WishlistsSkeleton
            viewMode={viewMode}
            key={"wishlist-skeleton-" + index}
          />
        ))}
      </DashboardGrid>
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
            ? hasActiveFilters
              ? "Нет списков, соответствующих вашему запросу"
              : "Вы не создали ни одного списка желаний"
            : ""
        }
        withButton={isDashboardOwner}
        buttonText="Создать список"
        action={() => openDialog("create")}
      />
    );
  }

  // вишлисты (при повторном loading при поиске/сортировке оставляет старые значения с opacity-60)
  if (wishlists && wishlists.length > 0) {
    return (
      <DashboardGrid
        viewMode={viewMode}
        className={cn(isLoading && "opacity-60")}
      >
        {wishlists.map((wishlist) => (
          <AccessWrapper type="wishlist" item={wishlist} key={wishlist.$id}>
            <AnimationsWrapper type="wishlist" viewMode={viewMode}>
              {viewMode === "gallery" ? (
                <WishlistGalleryItem wishlist={wishlist} />
              ) : (
                <WishlistTableItem wishlist={wishlist} />
              )}
            </AnimationsWrapper>
          </AccessWrapper>
        ))}
        {isValidating && <WishlistsSkeleton viewMode={viewMode} />}
      </DashboardGrid>
    );
  }
}

export default WishlistsPageLayout;
