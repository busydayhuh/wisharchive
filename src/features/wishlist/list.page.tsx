import { DashboardToolbarProvider } from "@/features/dashboard";
import { useParams } from "react-router";
import { useWishlist } from "./model/useWishlist";
import { WishlistLayout } from "./ui/WishlistLayout";

function WishlistPage() {
  const { listId } = useParams();
  const { wishlist, isLoading, error } = useWishlist(listId ?? null);

  if (isLoading) return <>Загрузка...</>;

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
