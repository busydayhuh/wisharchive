import { useParams } from "react-router";
import { DashboardToolbarProvider } from "../dashboard";
import { useWishlist } from "./model/useWishlist";
import { WishlistLayout } from "./ui/WishlistLayout";
import { WishlistSkeleton } from "./ui/WishlistSkeleton";

function WishlistPage() {
  const { listId } = useParams();
  const { wishlist, isLoading, error } = useWishlist(listId ?? null);

  if (isLoading) return <WishlistSkeleton />;

  if (error) return <>Ошибка</>;

  if (wishlist)
    return (
      <DashboardToolbarProvider
        dashboardType="list"
        localStorageKey={`list+${listId}}`}
      >
        <WishlistLayout wishlist={wishlist} />
      </DashboardToolbarProvider>
    );
}

export const Component = WishlistPage;
