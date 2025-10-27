import { type WishRoles } from "@/features/collaborators";
import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import {
  BookButton,
  FormattedPrice,
  WishImage,
  WishQuickActions,
} from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { LinkParams, WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, PRIVACY_ICONS } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo, type ReactNode } from "react";
import { Link } from "react-router";
import { WishlistControl } from "./WishlistControl";

// Обертка для считывания состояния hover и focus-within

export const CardWrapper = memo(function CardWrapper({
  wish,
  children,
}: {
  wish: WishDocumentType;
  children: ReactNode;
}) {
  const { hasAccess } = useWishcardMeta(wish);

  if (!hasAccess) {
    return null;
  }

  return <div className="group-card-wrapper">{children}</div>;
});

const WishGalleryItem = memo(function WishGalleryItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { onBookedPage, onListPage, userRoles, linkParams } =
    useWishcardMeta(wish);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 md:gap-2 mb-4 md:mb-8 overflow-hidden"
      )}
    >
      <WishCover
        wish={wish}
        userRoles={userRoles}
        linkParams={linkParams}
        isMobile={isMobile}
      />

      {!wish.isArchived && (
        <WishlistControl
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
        className="flex lg:flex-row flex-col lg:justify-between px-1"
      >
        <p className="pr-1 font-medium text-base lg:text-base xl:text-lg truncate">
          {wish.title}
        </p>

        {wish.price ? (
          <FormattedPrice
            price={wish.price}
            currency={wish.currency}
            className="text-muted-foreground text-sm lg:text-base xl:text-lg"
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
});

const WishCover = memo(function WishCover({
  wish,
  userRoles,
  linkParams,
  isMobile,
}: {
  wish: WishDocumentType;
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
            "bottom-0 left-0 absolute flex justify-between has-only:justify-end gap-1 p-3 w-full transition-all duration-300 show-actions"
          )}
        >
          {userRoles.isWishOwner ? (
            <WishQuickActions
              wishId={wish.$id}
              triggerVariant="gallery"
              side="top"
              align="start"
              isArchived={wish.isArchived}
              title={wish.title}
              linkState={linkParams.state}
            />
          ) : (
            <BookButton
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

export default WishGalleryItem;
