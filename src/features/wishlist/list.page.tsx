import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth";
import { ToolbarProvider, useAccess } from "../dashboard";
import { useWishlist } from "./model/useWishlist";
import { WishlistLayout } from "./ui/WishlistLayout";
import { WishlistSkeleton } from "./ui/WishlistSkeleton";

function WishlistPage() {
  const { listId } = useParams();
  const { wishlist, isLoading, error } = useWishlist(listId ?? null);
  const { isLoggedIn, current } = useAuth();
  const navigate = useNavigate();
  const { hasAccess, roles } = useAccess("wishlist", wishlist);

  if (isLoading) return <WishlistSkeleton />;
  if (error)
    return (
      <ErrorMessage
        variant="default"
        withButton={isLoggedIn}
        action={() =>
          navigate(href(ROUTES.WISHLISTS, { userId: current!.$id }))
        }
      />
    );
  if (!hasAccess) return <ErrorMessage variant="no-access" />;

  if (wishlist)
    return (
      <ToolbarProvider dashboardType="list" localStorageKey={`list+${listId}}`}>
        <WishlistLayout wishlist={wishlist} roles={roles} />
      </ToolbarProvider>
    );
}

export const Component = WishlistPage;
