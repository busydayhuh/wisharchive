import { useWishlistDialog } from "@/features/wishlist";
import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import type { Models } from "appwrite";
import { useNavigate } from "react-router";
import { useDashboard } from "../../model/store/dashboard/useDashboard";
import { useToolbar } from "../../model/store/toolbar/useToolbar";
import { ContentGrid } from "./ContentGrid";
import { WishesSkeleton } from "./wishes/WishesSkeleton";
import { WishlistsSkeleton } from "./wishlists/WishlistsSkeleton";

type RequestBoundaryProps = {
  items?: Models.Document[];
  type: "wish" | "wishlist";
  isLoading: boolean;
  error?: unknown;
  viewMode: "gallery" | "table";
  children: (safeItems: Models.Document[]) => React.ReactNode;
};

const STATUS_MESSAGES = {
  wish: {
    error: {
      message: "Что-то пошло не так",
      description: "Не получилось загрузить желания, повторите попытку позже",
    },
    empty: {
      message: "Нет желаний",
      description: "Здесь пока нет ни одного желания",
      CAT: "Создать желание",
    },
    "no-results": {
      message: "Не найдено",
      description: "Нет желаний, подходящих условиям фильтрации",
    },
  },
  wishlist: {
    error: {
      message: "Что-то пошло не так",
      description: "Не получилось загрузить списки, повторите попытку позже",
    },
    empty: {
      message: "Нет списков",
      description: "Здесь пока нет ни одного списка",
      CAT: "Создать список",
    },
    "no-results": {
      message: "Не найдено",
      description: "Нет списков, подходящих условиям фильтрации",
    },
  },
};

export function RequestBoundary({
  items,
  type,
  isLoading,
  viewMode,
  error,
  children,
}: RequestBoundaryProps) {
  const { isDashboardOwner, dashboardType } = useDashboard();
  const { hasActiveFilters } = useToolbar();
  const { openDialog } = useWishlistDialog();
  const navigate = useNavigate();
  const hasCreateBtn = ["wishes", "lists", "list"];

  if (isLoading && !items)
    return (
      <ContentGrid viewMode={viewMode}>
        {[...Array(5)].map((_, index) => (
          <ItemSkeleton
            viewMode={viewMode}
            type={type}
            key={"item-skeleton-" + index}
          />
        ))}
      </ContentGrid>
    );

  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message={STATUS_MESSAGES[type]["error"].message}
        description={STATUS_MESSAGES[type]["error"].description}
      />
    );

  if (items && items.length === 0) {
    return (
      <ErrorMessage
        variant="no-items"
        message={
          hasActiveFilters
            ? STATUS_MESSAGES[type]["no-results"].message
            : STATUS_MESSAGES[type]["empty"].message
        }
        description={
          hasActiveFilters
            ? STATUS_MESSAGES[type]["no-results"].description
            : STATUS_MESSAGES[type]["empty"].description
        }
        withButton={isDashboardOwner && hasCreateBtn.includes(dashboardType)}
        buttonText={STATUS_MESSAGES[type]["empty"].CAT}
        action={() =>
          type === "wish" ? navigate(ROUTES.ADD) : openDialog("create")
        }
      />
    );
  }

  if (items) return children(items);
}

export function ItemSkeleton({
  type,
  viewMode,
}: {
  type: "wishlist" | "wish";
  viewMode: "gallery" | "table";
}) {
  return type === "wish" ? (
    <WishesSkeleton viewMode={viewMode} />
  ) : (
    <WishlistsSkeleton viewMode={viewMode} />
  );
}
