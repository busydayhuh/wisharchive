import { useDashboardContext } from "@/features/dashboard/model/useDashboardContext";
import { useDashboardToolbar } from "@/features/dashboard/model/useDashboardToolbar";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { useNavigate } from "react-router";
import { AccessWrapper } from "../AccessWrapper";
import { AnimationsWrapper } from "../AnimationsWrapper";
import { DashboardGrid } from "../DashboardGrid";
import WishGalleryItem from "./WishGalleryItem";
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
    return (
      <DashboardGrid viewMode={viewMode}>
        {[...Array(5)].map((_, index) => (
          <WishesSkeleton viewMode={viewMode} key={"wish-skeleton-" + index} />
        ))}
      </DashboardGrid>
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
    return (
      <DashboardGrid
        viewMode={viewMode}
        className={cn(isLoading && "opacity-60")}
      >
        {wishes.map((wish) => (
          <AccessWrapper type="wish" item={wish} key={wish.$id}>
            <AnimationsWrapper type="wish" viewMode={viewMode}>
              {viewMode === "gallery" ? (
                <WishGalleryItem wish={wish} />
              ) : (
                <WishTableItem wish={wish} />
              )}
            </AnimationsWrapper>
          </AccessWrapper>
        ))}
        {isValidating && <WishesSkeleton viewMode={viewMode} />}
      </DashboardGrid>
    );
  }
}
