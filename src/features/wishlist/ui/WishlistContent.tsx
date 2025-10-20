import { useDashboardToolbar, WishesPageLayout } from "@/features/dashboard";
import { useWishes } from "@/features/wish";
import { useInfiniteScroll } from "@/shared/lib/react/useInfiniteScroll";

export function WishlistContent({ wishlistId }: { wishlistId: string }) {
  const { searchString, toolbarState } = useDashboardToolbar();

  const { wishes, isLoading, error, isValidating, size, setSize, reachedEnd } =
    useWishes({
      searchString: searchString,
      wishlistId: wishlistId,
      archived: false,
      sort: toolbarState.sort,
      filters: toolbarState.filters,
    });

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 0,
  });

  return (
    <WishesPageLayout
      wishes={wishes}
      isLoading={isLoading}
      error={error}
      isValidating={isValidating}
      viewMode={toolbarState.viewMode}
    />
  );
}
