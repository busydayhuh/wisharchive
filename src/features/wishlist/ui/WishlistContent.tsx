import { ContentLayout } from "@/features/dashboard";
import { useToolbar } from "@/features/dashboard/model";
import { useWishes } from "@/features/wish/model";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

export function WishlistContent({ wishlistId }: { wishlistId: string }) {
  const { searchString, toolbarState } = useToolbar();
  const { wishes, isLoading, error, isValidating, size, setSize, reachedEnd } =
    useWishes(
      {
        searchString: searchString,
        wishlistId: wishlistId,
        archived: false,
        sort: toolbarState.sort,
        filters: toolbarState.filters,
      },
      "wishlist",
      wishlistId
    );

  useInfiniteScroll({
    loadMore: () => setSize(size + 1),
    disabled: isValidating || reachedEnd,
    offset: 0,
  });

  return (
    <ContentLayout
      items={wishes}
      isLoading={isLoading}
      error={error}
      isValidating={isValidating}
      type="wish"
    />
  );
}
