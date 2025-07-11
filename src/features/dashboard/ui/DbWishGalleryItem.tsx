import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { LockIcon, Stars } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import ActionMenu from "./ActionMenu";

type WishcardProps = {
  wish: {
    $id: string;
    name: string;
    listId: string;
    listName: string;
    listPrivate: boolean;
    url: string;
    price: number;
    currency: string;
    isBooked: boolean;
    imageUrl: string;
    imageAspectRatio: number;
  };
};

// TODO изменить тип на встроенный от appwrite + мои поля

const DbWishGalleryItem = memo(function DbWishGalleryItem({
  wish,
}: WishcardProps) {
  return (
    <div className="group/cover relative flex flex-col gap-2 mb-6">
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        {wish.isBooked && (
          <div className="inline-flex top-2 left-2 z-100 absolute items-center gap-1 bg-destructive px-2.5 py-1 rounded-3xl text-background">
            <Stars className="size-3" />
            <span className="pb-0.5 font-medium">Забронировано</span>
          </div>
        )}
        <div className="relative">
          <ActionMenu triggerVariant="gallery" />
          <img
            src={wish.imageUrl}
            alt={wish.name}
            className="group-hover/cover:brightness-50 peer-[[aria-expanded='true']]/cover:brightness-50 rounded-2xl w-full max-h-[36rem] object-cover transition"
          />
        </div>

        <div className="flex justify-between px-1 pt-2">
          <span className="pr-1 font-medium text-lg truncate">{wish.name}</span>
          <span className="text-lg">
            {wish.price && `${wish.price}${wish.currency}`}
          </span>
        </div>
      </Link>
      <div className="flex justify-between items-baseline px-1">
        {wish.listId && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-6 font-normal text-xs"
            asChild
          >
            <Link to={href(ROUTES.WISHLIST, { listId: wish.listId })}>
              {wish.listPrivate && <LockIcon className="size-3" />}
              {wish.listName}
            </Link>
          </Button>
        )}
        {/* {wish.url && (
          <Button
            variant="link"
            className="items-center gap-1 py-0 h-fit font-normal"
            asChild
          >
            <Link to={wish.url}>
              <Globe className="size-3" />
              <span className="leading-4">ozon.ru</span>
            </Link>
          </Button>
        )} */}
      </div>
    </div>
  );
});

export default DbWishGalleryItem;
