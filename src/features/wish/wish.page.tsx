import { useParams } from "react-router";
import { useAuth } from "../auth";
import { useWish } from "./model/useWish";
import { useWishRoles } from "./model/useWishRoles";
import BackButton from "./ui/buttons/BackButton";
import { RelatedWishes } from "./ui/RelatedWishes";
import { WishImage } from "./ui/WishImage";
import { WishInfo } from "./ui/WishInfo";
import { WishLayout } from "./ui/WishLayout";

function WishPage() {
  const { current: authUser } = useAuth();
  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId);

  const roles = useWishRoles(
    authUser?.$id ?? "",
    wish?.wishlistId ?? null,
    wish?.ownerId ?? null,
    wish?.bookerId ?? null
  );

  if (error) return "Ошибка";
  if (isLoading) return "Загрузка...";
  if (wish)
    return (
      <WishLayout
        backSlot={<BackButton />}
        imageSlot={
          <WishImage
            url={wish.imageURL}
            alt={wish.title}
            isBooked={wish.isBooked}
          />
        }
        infoSlot={<WishInfo wish={wish} wishRoles={roles} />}
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
