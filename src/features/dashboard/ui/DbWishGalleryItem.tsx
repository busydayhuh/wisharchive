import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { LockIcon, Stars } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import ActionMenu from "./ActionMenu";

type WishcardProps = {
  wish: {
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

const DbWishGalleryItem = memo(function DbWishGalleryItem({
  wish,
}: WishcardProps) {
  return (
    <div className="group relative flex flex-col gap-2 mb-6">
      {wish.isBooked && (
        <div className="inline-flex top-2 left-2 z-100 absolute items-center gap-1 bg-destructive px-2.5 py-1 rounded-3xl text-background">
          <Stars className="size-3" />
          <span className="pb-0.5 font-medium">Забронировано</span>
        </div>
      )}
      <div className="relative">
        <ActionMenu className="peer invisible aria-expanded:visible group-hover:visible right-2 -bottom-3 z-100 absolute opacity-0 aria-expanded:opacity-100 group-hover:opacity-100 transition aria-expanded:-translate-y-6 group-hover:-translate-y-6 duration-300" />
        <img
          src={wish.imageUrl}
          alt={wish.name}
          className="group-hover:brightness-50 peer-[[aria-expanded='true']]:brightness-50 w-full max-h-[36rem] object-cover transition"
        />
      </div>

      <div className="flex justify-between px-1">
        <span className="pr-1 font-medium text-lg truncate">{wish.name}</span>
        <span className="text-lg">
          {wish.price && `${wish.price}${wish.currency}`}
        </span>
      </div>
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
