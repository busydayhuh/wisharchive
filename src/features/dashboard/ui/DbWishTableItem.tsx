import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Globe, LockIcon, Stars } from "lucide-react";
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

// TODO переместить WishcardProps, дубль

const DbWishTableItem = memo(function DbWishTableItem({ wish }: WishcardProps) {
  //TODO адаптировать под мобилку
  return (
    <div className="relative items-center grid grid-cols-[80px_2fr_1fr] md:grid-cols-[fit-content(128px)_2fr_1fr_1fr_fit-content(80px)_1fr] py-1 md:py-2 pl-0 md:pl-2 overflow-hidden transition">
      {wish.isBooked && (
        <div className="top-2 md:top-3 left-1 md:left-3 absolute bg-destructive p-1.5 rounded-full text-background">
          <Stars className="size-3" />
        </div>
      )}
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        <img
          src={wish.imageUrl}
          alt={wish.name}
          className="rounded-[0.5rem] md:rounded-2xl w-full max-w-32 object-cover aspect-[4/3]"
        />
      </Link>
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        <div className="flex flex-col px-2 md:px-4 max-w-[25ch] md:max-w-full">
          <span className="font-medium text-base md:text-lg truncate">
            {wish.name}
          </span>
          {wish.price && (
            <span className="md:hidden block text-sm">
              {`${wish.price}${wish.currency}`}
            </span>
          )}
          {wish.isBooked && (
            <span className="font-medium text-destructive text-sm">
              забронировано
            </span>
          )}
        </div>
      </Link>
      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="hidden md:block"
      >
        <div className="px-1 text-sm md:text-lg">
          {wish.price && `${wish.price}${wish.currency}`}
        </div>
      </Link>
      <div className="hidden md:block">
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
      <div className="hidden md:block">
        {wish.url && (
          <Button
            variant="link"
            className="items-baseline gap-1 w-fit max-w-[20ch] font-normal text-sm"
            asChild
          >
            <a href={wish.url} target="_blank">
              <Globe className="size-3" />
              <span className="truncate leading-4">ozon.ru</span>
            </a>
          </Button>
        )}
      </div>
      <ActionMenu triggerVariant="table" side="bottom" align="center" />
    </div>
  );
});

export default DbWishTableItem;
