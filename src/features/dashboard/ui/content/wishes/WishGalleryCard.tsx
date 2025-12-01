import { type WishRoles } from "@/features/collaborators";
import { useWishcardMeta } from "@/features/dashboard/model/hooks/useWishcardMeta";
import {
  BookButton,
  FormattedPrice,
  QuickActions,
  WishImage,
} from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { LinkParams, WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, PRIVACY_ICONS } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo } from "react";
import { Link } from "react-router";
import { WishlistDisplayResolver } from "./WishlistDisplayResolver";

function WishGalleryCard({ wish }: { wish: WishDocumentType }) {
  const { onBookedPage, onListPage, userRoles, linkParams, onEditWish } =
    useWishcardMeta(wish);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 mb-4 md:mb-8 overflow-hidden"
      )}
    >
      <WishCover
        wish={wish}
        userRoles={userRoles}
        linkParams={linkParams}
        onEditWish={onEditWish}
        isMobile={isMobile}
      />

      {!wish.isArchived && (
        <WishlistDisplayResolver
          wishTitle={wish.title}
          imageURL={wish.imageURL ?? undefined}
          className={cn(
            "top-3 right-3 absolute w-fit font-medium md:text-sm 2xl:text-sm"
          )}
          isMobile={isMobile}
          onListPage={!!onListPage}
          isOwner={userRoles?.isWishOwner ?? false}
          isEditor={userRoles?.isEditor ?? false}
          wishlist={wish.wishlist}
          wishId={wish.$id}
        />
      )}

      <Link
        to={linkParams.to}
        state={linkParams.state}
        className="flex lg:flex-row flex-col lg:justify-between lg:items-center px-1"
      >
        <p className="pr-1 font-semibold text-base lg:text-base xl:text-lg truncate">
          {wish.title}
        </p>

        {wish.price ? (
          <FormattedPrice
            price={wish.price}
            currency={wish.currency}
            className="text-muted-foreground text-sm lg:text-base"
          />
        ) : (
          <p className="text-transparent whitespace-nowrap">₽</p>
        )}
      </Link>
      <div className="flex justify-between items-center gap-1">
        {(onBookedPage || onListPage) && (
          <OwnerAvatar
            userId={wish.ownerId}
            userName={wish.owner.userName}
            avatarURL={wish.owner.avatarURL}
            className="[&_.owner-name]:hidden lg:[&_.owner-name]:inline text-xs md:text-sm"
          />
        )}
        <PriorityBadge priority={wish.priority} size="sm" />
      </div>
    </div>
  );
}

const WishCover = memo(function WishCover({
  wish,
  onEditWish,
  userRoles,
  linkParams,
  isMobile,
}: {
  wish: WishDocumentType;
  onEditWish: () => void;
  userRoles?: WishRoles;
  linkParams: LinkParams;
  isMobile: boolean;
}) {
  return (
    <div className={cn("relative rounded-2xl overflow-hidden")}>
      <Link to={linkParams.to} state={linkParams.state}>
        <WishImage
          wishId={wish.$id}
          url={wish.imageURL}
          alt={wish.title}
          variant="gallery"
          isBooked={wish.isBooked}
        />
      </Link>

      {wish.wishlist?.isPrivate && isMobile && (
        <div className="top-2 left-2 absolute flex justify-center items-center rounded-full w-6 h-6 overflow-clip">
          {PRIVACY_ICONS.private}
        </div>
      )}

      {userRoles && (
        <div
          className={cn(
            "right-0 bottom-0 absolute flex justify-end has-only:justify-end gap-1 p-3 w-fit"
          )}
        >
          {userRoles.isWishOwner ? (
            <QuickActions
              imageURL={wish.imageURL ?? undefined}
              wishId={wish.$id}
              triggerVariant="gallery"
              side="top"
              align="start"
              isArchived={wish.isArchived}
              title={wish.title}
              onEditWish={onEditWish}
              className="transition-all duration-300 show-actions"
            />
          ) : (
            <BookButton
              wishTitle={wish.title}
              imageURL={wish.imageURL ?? undefined}
              wishId={wish.$id}
              triggerVariant="gallery"
              isBooked={wish.isBooked}
              isBookedByCurrentUser={userRoles?.isBooker}
            />
          )}
        </div>
      )}
    </div>
  );
});

export default WishGalleryCard;
