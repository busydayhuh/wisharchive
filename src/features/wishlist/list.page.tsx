import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth";
import { ToolbarProvider } from "../dashboard";
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
        message={
          error.code === 404 ? "Список не найден" : "Что-то пошло не так"
        }
        description={
          error.code === 404
            ? "Такого списка не существует или он был удалён"
            : "Не удалось загрузить список, повторите попытку позже"
        }
        withButton={isLoggedIn}
        buttonText="К моим спискам"
        action={() =>
          navigate(href(ROUTES.WISHLISTS, { userId: current!.$id }))
        }
      />
    );

  if (wishlist)
    return (
      <ToolbarProvider dashboardType="list" localStorageKey={`list+${listId}}`}>
        <WishlistLayout wishlist={wishlist} />
      </ToolbarProvider>
    );
}

export const Component = WishlistPage;
