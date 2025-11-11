import { useDashboardContext } from "@/features/dashboard/model/useDashboardContext";
import { useDashboardToolbar } from "@/features/dashboard/model/useDashboardToolbar";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router";
import WishGalleryItem, { CardWrapper } from "./WishGalleryItem";
import WishTableItem from "./WishTableItem";
import { WishesSkeleton } from "./WishesSkeleton";

export function WishesPageLayout({
  wishes,
  isLoading,
  isValidating,
  error,
  viewMode,
}: {
  wishes?: WishDocumentType[];
  isLoading: boolean;
  isValidating: boolean;
  error?: unknown;
  viewMode: "gallery" | "table";
}) {
  const { isDashboardOwner } = useDashboardContext();
  const { hasActiveFilters } = useDashboardToolbar();
  const navigate = useNavigate();

  // изначальная загрузка (скелетон)
  if (isLoading && !wishes)
    return viewMode === "gallery" ? (
      <Masonry
        breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {[...Array(5)].map((_, index) => (
          <WishesSkeleton viewMode={viewMode} key={"wish-skeleton-" + index} />
        ))}
      </Masonry>
    ) : (
      <div className="flex flex-col gap-1 md:gap-2 -mt-2">
        {[...Array(5)].map((_, index) => (
          <WishesSkeleton viewMode={viewMode} key={"wish-skeleton-" + index} />
        ))}
      </div>
    );

  // ошибка
  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message="Что-то пошло не так"
        description="Не удалось загрузить желания, повторите попытку позже"
      />
    );

  // нет желаний
  if (wishes && wishes.length === 0) {
    return (
      <ErrorMessage
        variant="no-items"
        message="Нет желаний"
        description={
          isDashboardOwner
            ? hasActiveFilters
              ? "Нет желаний, соответствующих вашему запросу"
              : "Вы не создали ни одного желания"
            : ""
        }
        withButton={isDashboardOwner}
        buttonText="Создать желание"
        action={() => navigate(ROUTES.ADD)}
      />
    );
  }

  // желания (при повторном loading при поиске/сортировке оставляет старые значения с opacity-60)
  if (wishes && wishes.length > 0) {
    return viewMode === "gallery" ? (
      <Masonry
        breakpointCols={{ default: 5, 1470: 4, 1280: 3, 768: 2 }}
        className={cn("my-masonry-grid", isLoading && "opacity-60")}
        columnClassName="my-masonry-grid_column"
      >
        {wishes.map((wish) => (
          <CardWrapper key={wish.$id} wish={wish}>
            <WishGalleryItem wish={wish} />
          </CardWrapper>
        ))}
        {/* infinite загрузка */}
        {isValidating && <WishesSkeleton viewMode={viewMode} />}
      </Masonry>
    ) : (
      <div
        className={cn(
          "flex flex-col gap-1 md:gap-2 -mt-2",
          isLoading && "opacity-60"
        )}
      >
        {wishes.map((wish) => (
          <WishTableItem wish={wish} key={wish.$id} />
        ))}
        {/* infinite загрузка */}
        {isValidating && <WishesSkeleton viewMode={viewMode} />}
      </div>
    );
  }
}
