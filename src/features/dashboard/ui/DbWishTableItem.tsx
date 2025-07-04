import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Globe, LockIcon, Stars } from "lucide-react";
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

// TODO переместить WishcardProps, дубль

const DbWishTableItem = memo(function DbWishTableItem({ wish }: WishcardProps) {
  return (
    <div className="relative items-center grid grid-cols-[fit-content(128px)_3fr_1fr_2fr_2fr_1fr] py-2 pl-2 transition">
      {wish.isBooked && (
        <div className="top-3 left-3 absolute bg-destructive px-1.5 py-1.5 rounded-full text-background">
          <Stars className="size-3" />
        </div>
      )}

      <img
        src={wish.imageUrl}
        alt={wish.name}
        className="w-full max-w-32 object-cover aspect-video"
      />

      <div className="flex flex-col px-4">
        <span className="font-medium text-lg truncate">{wish.name}</span>
        {wish.isBooked && (
          <span className="font-medium text-destructive text-sm">
            забронировано
          </span>
        )}
      </div>
      <div className="px-1 text-lg">
        {wish.price && `${wish.price}${wish.currency}`}
      </div>

      <div>
        {wish.listId && (
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent rounded-full h-6 font-normal text-sm"
            asChild
          >
            <Link
              to={href(ROUTES.WISHLIST, { listId: wish.listId })}
              className="w-fit max-w-[25ch]"
            >
              {wish.listPrivate && <LockIcon className="size-3" />}
              <span className="truncate">{wish.listName}</span>
            </Link>
          </Button>
        )}
      </div>
      <div>
        {wish.url && (
          <Button
            variant="link"
            className="items-baseline gap-1 w-fit font-normal text-base"
            asChild
          >
            <Link to={wish.url}>
              <Globe className="size-3" />
              <span className="max-w-[10ch] truncate leading-4">ozon.ru</span>
            </Link>
          </Button>
        )}
      </div>
      <ActionMenu
        className="bg-muted hover:bg-muted/60"
        side="bottom"
        align="center"
      />
    </div>
  );
});

export default DbWishTableItem;
