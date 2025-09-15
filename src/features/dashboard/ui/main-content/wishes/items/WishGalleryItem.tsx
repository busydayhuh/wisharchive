import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import { GiftButton, WishImage, WishQuickActions } from "@/features/wish";
import { cn } from "@/shared/lib/css";
import { Currency } from "@/shared/lib/currency";
import { formatPrice } from "@/shared/lib/formatPrice";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo, type ReactNode } from "react";
import { href, Link } from "react-router";
import { WishlistBadge } from "../Badges";

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
  const { isBooker, onBookedPage } = useWishcardMeta(wish);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1 md:gap-2 mb-4 overflow-hidden",
        wish.isBooked && !isBooker && "opacity-60"
      )}
    >
      <WishCover wish={wish} />

      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="flex md:flex-row flex-col justify-between md:items-center px-1"
      >
        <span className="pr-1 font-medium text-base lg:text-base xl:text-lg truncate">
          {wish.title}
        </span>
        <span className="inline-flex items-center gap-1 text-muted-foreground text-sm lg:text-base xl:text-lg">
          {!!wish.price && (
            <>
              <span>{formatPrice(wish.price)}</span>
              <Currency currency={wish.currency ?? "RUB"} />
            </>
          )}
        </span>
      </Link>

      <div className="flex justify-start items-baseline px-1">
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
              wishlistId={wish.wishlist.$id}
              title={wish.wishlist.title}
              isPrivate={wish.wishlist.isPrivate}
              className="text-xs"
            />
          )
        )}
      </div>
    </div>
  );
});

const WishCover = memo(function WishCover({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const {
    isOwner,
    isBooker,
    isEditor,
    toggleBookingStatus,
    archiveWish,
    deleteWish,
    editWish,
  } = useWishcardMeta(wish);

  return (
    <div className={cn("relative rounded-2xl overflow-hidden")}>
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        <WishImage
          wishId={wish.$id}
          url={wish.imageURL}
          alt={wish.title}
          variant="gallery"
          isBooked={wish.isBooked}
          isBooker={isBooker}
        />
      </Link>

      <div
        className={cn(
          "bottom-0 left-0 absolute flex justify-between has-only:justify-end gap-1 p-3 w-full transition-all duration-300 show-actions"
        )}
      >
        {(isOwner || isEditor) && (
          <WishQuickActions
            triggerVariant="gallery"
            side="top"
            align="start"
            isArchived={wish.isArchived}
            archiveWish={archiveWish}
            deleteWish={deleteWish}
            editWish={editWish}
          />
        )}
        {!isOwner && (
          <GiftButton
            variant="gallery"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={isBooker}
            onPressed={toggleBookingStatus}
          />
        )}
      </div>

      {/* <Actions
        isOwner={isOwner}
        isBooker={isBooker}
        isEditor={isEditor}
        toggleBookingStatus={toggleBookingStatus}
        archiveWish={archiveWish}
        deleteWish={deleteWish}
        archived={wish.isArchived}
        isBooked={wish.isBooked}
      /> */}
    </div>
  );
});

// const Actions = memo(function Actions({
//   isOwner,
//   isBooker,
//   isEditor,
//   toggleBookingStatus,
//   archived,
//   isBooked,
// }: {
//   isOwner: boolean;
//   isBooker: boolean;
//   isEditor: boolean;
//   toggleBookingStatus: (pressed: boolean) => void;
//   archiveWish: (archived: boolean) => void;
//   deleteWish: (archived: boolean) => void;
//   archived: boolean;
//   isBooked: boolean;
// }) {
//   return (
//     <div
//       className={cn(
//         "bottom-0 left-0 absolute flex justify-between has-only:justify-end gap-1 p-3 w-full transition-all duration-300 show-actions"
//       )}
//     >
//       {(isOwner || isEditor) && (
//         <WishQuickActions
//           triggerVariant="gallery"
//           side="top"
//           align="start"
//           isArchived={archived}
//         />
//       )}
//       {!isOwner && (
//         <GiftButton
//           variant="gallery"
//           isBooked={isBooked}
//           isBookedByCurrentUser={isBooker}
//           onPressed={toggleBookingStatus}
//         />
//       )}
//     </div>
//   );
// });

export default WishGalleryItem;
