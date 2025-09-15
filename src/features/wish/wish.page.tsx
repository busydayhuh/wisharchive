import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router";
import { useAuth } from "../auth";
import { useWish } from "./model/useWish";
import { useWishPermissions } from "./model/useWishPermissions";
import BackButton from "./ui/buttons/BackButton";
import { RelatedWishes } from "./ui/RelatedWishes";
import { WishImage } from "./ui/WishImage";
import { WishInfo } from "./ui/WishInfo";
import { WishLayout } from "./ui/WishLayout";

function WishPage() {
  const { wishId } = useParams();
  const { wish, isLoading, error } = useWish(wishId ?? null);

  const { current: authUser } = useAuth();

  const roles = useWishPermissions(
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
        backSlot={
          <BackButton
            children={<ArrowLeft />}
            size="icon"
            variant="ghost"
            className="rounded-full"
          />
        }
        imageSlot={
          <WishImage
            wishId={wish.$id}
            url={wish.imageURL}
            alt={wish.title}
            isBooked={wish.isBooked}
            variant="page"
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
