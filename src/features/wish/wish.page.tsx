import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth";
import { useAccess } from "../dashboard";
import { useWish } from "./model/useWish";
import { RelatedWishes } from "./ui/RelatedWishes";
import { WishInfo } from "./ui/wish-info/WishInfo";
import { WishImage } from "./ui/WishImage";
import { WishLayout } from "./ui/WishLayout";
import { WishPageSkeleton } from "./ui/WishPageSkeleton";

function WishPage() {
  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);
  const navigate = useNavigate();
  const { userId, isLoggedIn } = useAuth();
  const { hasAccess } = useAccess("wish", wish);

  if (error)
    return (
      <ErrorMessage
        variant="not-found"
        withButton={isLoggedIn}
        action={() => navigate(href(ROUTES.WISHES, { userId: userId! }))}
      />
    );
  if (isLoading) return <WishPageSkeleton />;
  if (!hasAccess) return <ErrorMessage variant="no-access" />;

  if (wish)
    return (
      <WishLayout
        imageSlot={
          <WishImage
            wishId={wish.$id}
            url={wish.imageURL}
            alt={wish.title}
            isBooked={wish.isBooked}
            variant="page"
          />
        }
        infoSlot={<WishInfo wish={wish} />}
        relatedSlot={
          <RelatedWishes
            userId={wish.owner.userId}
            userName={wish.owner.userName}
            wishId={wish.$id}
          />
        }
      />
    );
}
export const Component = WishPage;
