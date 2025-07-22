import { Currency } from "@/shared/lib/currency";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import { LockIcon, Stars } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import ActionMenu from "./ActionMenu";

const DbWishGalleryItem = memo(function DbWishGalleryItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  return (
    <div className="relative flex flex-col gap-1 md:gap-2 mb-4 overflow-hidden">
      {wish.isBooked && (
        <div className="inline-flex top-2 left-2 z-10 absolute items-center gap-1 bg-destructive px-2 md:px-2.5 py-2 md:py-1 rounded-full md:rounded-3xl text-background">
          <Stars className="size-3" />
          <span className="hidden md:block pb-0.5 font-medium">
            Забронировано
          </span>
        </div>
      )}
      <div className="group/cover relative overflow-hidden">
        <ActionMenu triggerVariant="gallery" />
        <Link
          to={href(ROUTES.WISH, { wishId: wish.$id })}
          className="group-hover/cover:brightness-50 peer-[[data-state='open']]/cover:brightness-50 transition-[filter] duration-300"
        >
          <img
            src={wish.imageURL}
            alt={wish.title}
            className="rounded-2xl w-full max-h-[36rem] object-cover"
          />
        </Link>
      </div>

      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="flex md:flex-row flex-col justify-between md:items-center px-1"
      >
        <span className="pr-1 font-medium text-base lg:text-base xl:text-lg truncate">
          {wish.title}
        </span>
        <span className="inline-flex items-center text-sm lg:text-base xl:text-lg">
          {wish.price && (
            <>
              <span className="pb-0.5">{wish.price}</span>
              <Currency currency={wish.currency} />
            </>
          )}
        </span>
      </Link>

      <div className="flex justify-between items-baseline px-1">
        {wish.wishlist && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full max-w-[25ch] h-6 font-normal text-xs"
            asChild
          >
            <Link to={href(ROUTES.WISHLIST, { listId: wish.wishlist.$id })}>
              {wish.isPrivate && <LockIcon className="size-3" />}
              <span className="truncate">{wish.wishlist.title}</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
});

export default DbWishGalleryItem;
