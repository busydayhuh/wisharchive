import { formatUrl } from "@/shared/lib/formatUrl";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import { LockIcon, RussianRuble, ShoppingBag, Stars } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import ActionMenu from "./ActionMenu";

const DbWishTableItem = memo(function DbWishTableItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  return (
    <div className="relative flex justify-items-center items-center lg:grid lg:grid-cols-[fit-content(8rem)_2fr_1fr_1fr_1fr_1fr] py-1 md:py-2 pl-0 md:pl-2 w-full overflow-hidden transition">
      {wish.isBooked && (
        <div className="top-2 md:top-3 left-1 md:left-3 absolute bg-destructive p-1.5 rounded-full text-background">
          <Stars className="size-3" />
        </div>
      )}
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        <img
          src={wish.imageURL}
          alt={wish.title}
          className="rounded-[0.5rem] md:rounded-2xl w-full min-w-20 md:min-w-28 max-w-32 object-cover aspect-[4/3]"
        />
      </Link>
      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="justify-self-start"
      >
        <div className="flex flex-col px-2 md:px-4 max-w-[25ch] md:max-w-[30ch] xl:max-w-full">
          <span className="font-medium text-base md:text-lg truncate">
            {wish.title}
          </span>
          {wish.price ? (
            <span className="md:hidden flex items-center gap-1">
              {wish.price}
              <RussianRuble className="size-3" />
            </span>
          ) : (
            <span className="md:hidden text-muted-foreground/60 text-sm leading-2.5">
              без цены
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
        className="hidden md:flex lg:justify-self-center items-center gap-1 px-1 text-sm md:text-lg"
      >
        {wish.price ? (
          <>
            {wish.price}
            <RussianRuble className="size-3" />
          </>
        ) : (
          <span className="text-muted-foreground/60 text-xs md:text-sm leading-2.5">
            без цены
          </span>
        )}
      </Link>
      <div className="hidden md:block ml-10 lg:ml-0">
        {wish.wishlist ? (
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent rounded-full h-6 font-normal text-sm"
            asChild
          >
            <Link
              to={href(ROUTES.WISHLIST, { listId: wish.wishlist.$id })}
              className="w-fit max-w-[25ch]"
            >
              {wish.isPrivate && <LockIcon className="size-3" />}
              <span className="truncate">{wish.wishlist.title}</span>
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-muted-foreground/60 rounded-full w-fit h-6 font-normal text-muted-foreground/60 text-sm pointer-events-none"
            asChild
          >
            <span className="max-w-[25ch] truncate">без списка</span>
          </Button>
        )}
      </div>
      <div className="hidden lg:flex items-center gap-2 w-fit">
        {wish.shopURL && (
          <>
            <ShoppingBag className="size-3" />
            <Button
              variant="link"
              className="inline-block px-0 max-w-[10ch] xl:max-w-[25ch] font-normal text-sm truncate leading-4"
              asChild
            >
              <a href={wish.shopURL} target="_blank">
                {formatUrl(wish.shopURL)}
              </a>
            </Button>
          </>
        )}
      </div>
      <div className="ms-auto">
        <ActionMenu triggerVariant="table" side="bottom" align="center" />
      </div>
    </div>
  );
});

export default DbWishTableItem;
