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
    <div className="group/cover relative flex flex-col gap-1 md:gap-2 mb-4 overflow-hidden">
      {wish.isBooked && (
        <div className="inline-flex top-2 left-2 z-10 absolute items-center gap-1 bg-destructive px-2 md:px-2.5 py-2 md:py-1 rounded-full md:rounded-3xl text-background">
          <Stars className="size-3" />
          <span className="hidden md:block pb-0.5 font-medium">
            Забронировано
          </span>
        </div>
      )}
      <div className="relative overflow-hidden">
        <ActionMenu triggerVariant="gallery" />
        <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
          <img
            src={wish.imageUrl}
            alt={wish.name}
            className="group-hover/cover:brightness-50 peer-[[aria-expanded='true']]/cover:brightness-50 rounded-2xl w-full max-h-[36rem] object-cover transition"
          />
        </Link>
      </div>

      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="flex md:flex-row flex-col justify-between px-1"
      >
        <span className="pr-1 font-medium text-base md:text-lg truncate">
          {wish.name}
        </span>
        <span className="text-base md:text-lg">
          {wish.price && `${wish.price}${wish.currency}`}
        </span>
      </Link>

      <div className="flex justify-between items-baseline px-1">
        {wish.listId && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full max-w-[25ch] h-6 font-normal text-xs"
            asChild
          >
            <Link to={href(ROUTES.WISHLIST, { listId: wish.listId })}>
              {wish.listPrivate && <LockIcon className="size-3" />}
              <span className="truncate"> {wish.listName}</span>
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
