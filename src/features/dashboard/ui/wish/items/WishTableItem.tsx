import "@/shared/assets/custom.css";
import { cn } from "@/shared/lib/css";
import { Currency } from "@/shared/lib/currency";
import { formatUrl } from "@/shared/lib/formatUrl";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import { Gift, LockIcon, ShoppingBag } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import OwnerAvatar from "../../../../../shared/ui/OwnerAvatar";
import { checkPermissions } from "../../../model/checkPermissions";
import { useDashboardContext } from "../../common/DashboardLayout";
import ActionsDropdown from "../actions/ActionsDropdown";
import { GiftButton } from "../actions/GiftButton";

const WishTableItem = memo(function WishTableItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { pathname, authUser } = useDashboardContext();
  const { isOwner, isBooker, isEditor } = checkPermissions(authUser!.$id, wish);

  return (
    <div className="relative flex justify-items-center items-center lg:grid lg:grid-cols-[fit-content(8rem)_2fr_1fr_1fr_1fr_1fr] py-1 md:py-2 pl-0 md:pl-1 w-full transition dot-on-hover">
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
            <span className="md:hidden flex items-center">
              <span className="pb-0.5">{wish.price}</span>
              <Currency currency={wish.currency} />
            </span>
          ) : (
            <span className="md:hidden text-muted-foreground/60 text-sm leading-2.5">
              без цены
            </span>
          )}
          {wish.isBooked && (
            <div
              className={cn(
                "inline-flex items-center gap-1 font-medium text-sm",
                isBooker ? "text-destructive" : "text-muted-foreground"
              )}
            >
              <Gift className="size-3" />
              забронировано
            </div>
          )}
        </div>
      </Link>
      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="hidden md:flex lg:justify-self-center items-center px-1 text-sm md:text-lg"
      >
        {wish.price ? (
          <>
            <span className="pb-0.5">{wish.price}</span>
            <Currency currency={wish.currency} />
          </>
        ) : (
          <span className="text-muted-foreground/60 text-xs md:text-sm leading-2.5">
            без цены
          </span>
        )}
      </Link>
      <div className="hidden md:block ml-10 lg:ml-0">
        {pathname !== "/booked" ? (
          wish.wishlist ? (
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
          )
        ) : (
          <OwnerAvatar
            userId={wish.ownerId}
            userName={wish.owner.userName}
            avatarURL={wish.owner.avatarURL}
          />
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
        {isOwner && (
          <ActionsDropdown
            triggerVariant="table"
            isArchived={wish.isArchived}
          />
        )}
        {!isOwner && isEditor && (
          <div className="flex md:flex-row flex-col gap-1 md:gap-4">
            <ActionsDropdown
              triggerVariant="table"
              side="bottom"
              align="end"
              isArchived={wish.isArchived}
            />
            <GiftButton
              variant="table"
              isBooked={wish.isBooked}
              isBookedByCurrentUser={isBooker}
            />
          </div>
        )}
        {!isOwner && !isEditor && (
          <GiftButton
            variant="table"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={isBooker}
          />
        )}
      </div>
    </div>
  );
});

export default WishTableItem;
