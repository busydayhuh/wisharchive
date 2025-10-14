import { useDashboardToolbar, WishesPageLayout } from "@/features/dashboard";
import { useWishes } from "@/features/wish";

export function WishlistContent({ wishlistId }: { wishlistId: string }) {
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishes, isLoading, error } = useWishes({
    searchString: searchString,
    wishlistId: wishlistId,
    archived: false,
    sort: toolbarState.sort,
    filters: toolbarState.filters,
  });
  return (
    <WishesPageLayout
      wishes={wishes}
      isLoading={isLoading}
      error={error}
      viewMode={toolbarState.viewMode}
    />
  );
}
