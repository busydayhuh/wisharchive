import { formatUrl } from "@/shared/lib/formatUrl";
import { ROUTES } from "@/shared/model/routes";
import type {
  UserDocumentType,
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import ExpandableText from "@/shared/ui/ExpandableText";
import { Button } from "@/shared/ui/kit/button";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { ChevronRight, LockIcon, ShoppingBag } from "lucide-react";
import { Link, href } from "react-router";
import type { WishRolesType } from "../model/useWishRoles";
import { ActionsDropdown } from "./buttons/ActionsDropdown";
import { ArchiveButton } from "./buttons/ArchiveButton";
import { GiftButton } from "./buttons/GiftButton";

export function WishInfo({
  wish,
  wishRoles,
}: {
  wish?: WishDocumentType;
  wishRoles?: WishRolesType;
}) {
  if (!wish) return null;

  return (
    <div className="flex flex-col gap-10 ml-4 py-2.5">
      <WishHeader
        title={wish.title}
        owner={wish.owner}
        isOwner={wishRoles?.isEditor}
        wishlist={wish.wishlist}
      />

      {wish.description && <ExpandableText text={wish.description} />}

      <WishFooter
        wishId={wish.$id}
        isBooked={wish.isBooked}
        price={`${wish.price} ${wish.currency}`}
        shopURL={wish.shopURL}
        isArchived={wish.isArchived}
        wishRoles={wishRoles}
      />
    </div>
  );
}

function WishHeader({
  title,
  owner,
  isOwner,
  wishlist,
}: {
  title: string;
  owner: UserDocumentType;
  isOwner?: boolean;
  wishlist?: WishlistDocumentType | null;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="font-bold text-3xl">{title}</span>

        {isOwner && (
          <ActionsDropdown triggerVariant="page" align="end" side="bottom" />
        )}
      </div>

      <OwnerAvatar
        userId={owner.userId}
        userName={owner.userName}
        avatarURL={owner.avatarURL}
      />

      {wishlist && (
        <div className="text-sm">
          В списке:
          <Button variant="link" className="text-destructive" asChild>
            <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
              {wishlist.isPrivate && <LockIcon className="size-3" />}
              <span className="truncate">{wishlist.title}</span>
              <ChevronRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

function WishFooter({
  wishId,
  isBooked,
  price,
  shopURL,
  isArchived,
  wishRoles,
}: {
  wishId: string;
  isBooked: boolean;
  price?: string;
  isArchived: boolean;
  shopURL?: string;
  wishRoles?: WishRolesType;
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        {price && <div className="font-medium text-xl">{price}</div>}
        {shopURL && (
          <Button variant="link" asChild>
            <a href={shopURL} target="_blank">
              <ShoppingBag /> {formatUrl(shopURL)}
            </a>
          </Button>
        )}
      </div>

      {wishRoles?.isOwner ? (
        <ArchiveButton
          wishId={wishId}
          isArchived={isArchived}
          className="md:w-fit"
        />
      ) : (
        <GiftButton
          variant="page"
          isBooked={isBooked}
          isBookedByCurrentUser={wishRoles?.isBooker ?? false}
          className="md:w-fit"
        />
      )}
    </div>
  );
}
