import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth";
import { DashboardToolbarProvider } from "../dashboard";
import { useWishlist } from "./model/useWishlist";
import { WishlistLayout } from "./ui/WishlistLayout";
import { WishlistSkeleton } from "./ui/WishlistSkeleton";

function WishlistPage() {
  const { listId } = useParams();
  const { wishlist, isLoading, error } = useWishlist(listId ?? null);
  const { isLoggedIn, current } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <WishlistSkeleton />;

  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message="Что-то пошло не так"
        description="Не удалось загрузить список, повторите попытку позже"
        withButton={isLoggedIn}
        buttonText="К моим желаниям"
        action={() => navigate(href(ROUTES.WISHES, { userId: current!.$id }))}
      />
    );

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
