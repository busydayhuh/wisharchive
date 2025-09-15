import { cn } from "@/shared/lib/css";
import { Currency } from "@/shared/lib/currency";
import { formatPrice } from "@/shared/lib/formatPrice";
import { ROUTES } from "@/shared/model/routes";
import type {
  UserDocumentType,
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import ExpandableText from "@/shared/ui/ExpandableText";
import { Button } from "@/shared/ui/kit/button";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { ShoppingCart } from "lucide-react";
import { Link, href } from "react-router";
import type { WishRolesType } from "../model/useWishPermissions";
import { ArchiveButton } from "./buttons/ArchiveButton";
import { GiftButton } from "./buttons/GiftButton";
import { WishQuickActions } from "./buttons/WishQuickActions";

export function WishInfo({
  wish,
  wishRoles,
}: {
  wish?: WishDocumentType;
  wishRoles?: WishRolesType;
}) {
  if (!wish) return null;

  return (
    <div className="flex flex-col gap-6 md:gap-10 px-2 md:px-0 py-2.5">
      <WishHeader
        wishId={wish.$id}
        title={wish.title}
        owner={wish.owner}
        isOwner={wishRoles?.isEditor}
        wishlist={wish.wishlist}
      />

      {wish.description && <ExpandableText text={wish.description} />}

      <WishFooter
        wishId={wish.$id}
        isBooked={wish.isBooked}
        price={wish.price}
        currency={wish.currency}
        shopURL={wish.shopURL}
        isArchived={wish.isArchived}
        wishRoles={wishRoles}
      />
    </div>
  );
}

function WishHeader({
  wishId,
  title,
  owner,
  isOwner,
  wishlist,
}: {
  wishId: string;
  title: string;
  owner: UserDocumentType;
  isOwner?: boolean;
  wishlist?: WishlistDocumentType | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-1">
        <span className="font-bold text-2xl md:text-3xl">{title}</span>

        {isOwner && (
          <WishQuickActions
            triggerVariant="page"
            align="end"
            side="bottom"
            wishId={wishId}
          />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-2 text-sm">
        <span className="text-muted-foreground">Автор</span>
        <OwnerAvatar
          userId={owner.userId}
          userName={owner.userName}
          avatarURL={owner.avatarURL}
          className="mt-0 h-6 font-medium hover:underline hover:underline-offset-4"
        />

        {wishlist && wishlist.title && (
          <>
            <span className="text-muted-foreground">
              в {wishlist.isPrivate && "приватном"} списке
            </span>

            <Button
              variant="link"
              className="px-0 h-6 hover:underline hover:underline-offset-4"
              asChild
            >
              <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
                <span className="truncate">{wishlist.title}</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function WishFooter({
  wishId,
  isBooked,
  price,
  currency,
  shopURL,
  isArchived,
  wishRoles,
}: {
  wishId: string;
  isBooked: boolean;
  price: number | null;
  currency: string;
  isArchived: boolean;
  shopURL: string | null;
  wishRoles?: WishRolesType;
}) {
  return (
    <div className={cn("flex flex-col gap-2 md:gap-5")}>
      {price && (
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1 font-bold text-3xl">
            {formatPrice(price)}
            <Currency currency={currency} />
          </div>
        </div>
      )}
      <div className="flex md:flex-row flex-col-reverse md:justify-between items-start md:items-center gap-4">
        {wishRoles?.isOwner ? (
          <ArchiveButton
            wishId={wishId}
            isArchived={isArchived}
            className="py-8 rounded-xl w-full md:max-w-2xs md:text-base"
          />
        ) : (
          <GiftButton
            variant="page"
            isBooked={isBooked}
            isBookedByCurrentUser={wishRoles?.isBooker ?? false}
            className="py-8 rounded-xl w-full md:text-base"
          />
        )}

        {shopURL && (
          <Button variant="link" asChild>
            <a
              href={shopURL}
              target="_blank"
              className="inline-flex items-center gap-1"
            >
              <ShoppingCart />
              <span>посмотреть в магазине</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
