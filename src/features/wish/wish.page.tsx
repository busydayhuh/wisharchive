import { ROUTES } from "@/shared/model/routes";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth";
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

  const { current: authUser, isLoggedIn } = useAuth();

  if (error) return;
  <ErrorMessage
    variant="default-error"
    message="Что-то пошло не так"
    description="Не удалось загрузить желание, повторите попытку позже"
    withButton={isLoggedIn}
    buttonText="К моим желаниям"
    action={() => navigate(href(ROUTES.WISHES, { userId: authUser!.$id }))}
  />;
  if (isLoading) return <WishPageSkeleton />;

  if (wish)
    return (
      <WishLayout
        backSlot={null}
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
