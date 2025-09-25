import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import {
  BookButton,
  FormattedPrice,
  WishImage,
  WishQuickActions,
} from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, WishlistBadge } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo, type ReactNode } from "react";
import { href, Link } from "react-router";

// Обертка для считывания состояния hover и focus-within

export const CardWrapper = memo(function CardWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="group-card-wrapper">{children}</div>;
});

const WishGalleryItem = memo(function WishGalleryItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { onBookedPage } = useWishcardMeta(wish);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 md:gap-2 mb-8 overflow-hidden"
      )}
    >
      <WishCover wish={wish} />

      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="flex lg:flex-row flex-col lg:justify-between px-1"
      >
        <span className="pr-1 font-medium text-base lg:text-base xl:text-lg truncate">
          {wish.title}
        </span>

        {wish.price ? (
          <FormattedPrice
            price={wish.price}
            currency={wish.currency}
            className="text-muted-foreground text-sm lg:text-base xl:text-lg"
          />
        ) : (
          <span className="text-transparent">без цены</span>
        )}
      </Link>

      <div className="flex justify-between items-center gap-1">
        {onBookedPage ? (
          <OwnerAvatar
            userId={wish.ownerId}
            userName={wish.owner.userName}
            avatarURL={wish.owner.avatarURL}
            className="text-xs md:text-sm"
          />
        ) : (
          wish.wishlist && (
            <WishlistBadge
              id={wish.wishlist.$id}
              title={wish.wishlist.title}
              isPrivate={wish.wishlist.isPrivate}
              size="sm"
            />
          )
        )}
        <PriorityBadge priority={wish.priority} size="sm" className="ms-auto" />
      </div>
    </div>
  );
});

const WishCover = memo(function WishCover({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { isOwner, isBooker, isEditor, bookWish } = useWishcardMeta(wish);

  return (
    <div className={cn("relative rounded-2xl overflow-hidden")}>
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        <WishImage
          wishId={wish.$id}
          url={wish.imageURL}
          alt={wish.title}
          variant="gallery"
          isBooked={wish.isBooked}
        />
      </Link>

      <div
        className={cn(
          "bottom-0 left-0 absolute flex justify-between has-only:justify-end gap-1 p-3 w-full transition-all duration-300 show-actions"
        )}
      >
        {(isOwner || isEditor) && (
          <WishQuickActions
            wishId={wish.$id}
            triggerVariant="gallery"
            side="top"
            align="start"
            isArchived={wish.isArchived}
            title={wish.title}
          />
        )}
        {!isOwner && (
          <BookButton
            triggerVariant="gallery"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={isBooker}
            action={bookWish}
          />
        )}
      </div>
    </div>
  );
});

export default WishGalleryItem;
