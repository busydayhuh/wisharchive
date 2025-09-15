import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import { GiftButton, WishImage, WishQuickActions } from "@/features/wish";
import "@/shared/assets/custom.css";
import { cn } from "@/shared/lib/css";
import { Currency } from "@/shared/lib/currency";
import { formatPrice } from "@/shared/lib/formatPrice";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo } from "react";
import { href, Link } from "react-router";
import { ShopBadge, WishlistBadge } from "../Badges";

const WishTableItem = memo(function WishTableItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { isOwner, isBooker, isEditor, toggleBookingStatus, onBookedPage } =
    useWishcardMeta(wish);

  return (
    <div
      className={cn(
        "relative flex justify-between items-center md:gap-5 md:px-1 py-1 md:py-2 w-full transition dot-on-hover",
        wish.isBooked && !isBooker && "opacity-70"
      )}
    >
      {/* Картинка */}
      <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
        <WishImage
          wishId={wish.$id}
          url={wish.imageURL}
          alt={wish.title}
          isBooked={wish.isBooked}
          isBooker={isBooker}
          variant="table"
        />
      </Link>

      {/* Название и цена */}
      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="flex md:flex-row flex-col flex-shrink md:gap-5 me-auto px-2 md:px-4"
      >
        <span className="max-w-[16ch] md:max-w-[30ch] xl:max-w-full font-medium text-base md:text-lg truncate">
          {wish.title}
        </span>

        {!!wish.price && (
          <span className="flex items-center gap-1 text-muted-foreground text-base md:text-lg">
            <span>{formatPrice(wish.price)}</span>
            <Currency currency={wish.currency ?? "RUB"} />
          </span>
        )}
      </Link>

      {/* Вишлист / владелец желания */}
      {/* Отображается при w >= 768px */}
      <div className="hidden md:block">
        {onBookedPage ? (
          <OwnerAvatar
            userId={wish.ownerId}
            userName={wish.owner.userName}
            avatarURL={wish.owner.avatarURL}
          />
        ) : (
          wish.wishlist && (
            <WishlistBadge
              wishlistId={wish.wishlist.$id}
              title={wish.wishlist.title}
              isPrivate={wish.wishlist.isPrivate}
              className="text-sm"
            />
          )
        )}
      </div>

      {/* Ссылка на магазин */}
      {/* Отображается при w >= 1024px */}
      <div className="hidden lg:flex">
        {wish.shopURL && <ShopBadge shopURL={wish.shopURL} />}
      </div>

      {/* Экшен-кнопки */}
      <div className="flex md:flex-row flex-col gap-1 md:gap-4">
        {(isOwner || isEditor) && (
          <WishQuickActions
            triggerVariant="table"
            side="bottom"
            align="end"
            isArchived={wish.isArchived}
          />
        )}

        {!isOwner && (
          <GiftButton
            variant="table"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={isBooker}
            onPressed={toggleBookingStatus}
          />
        )}
      </div>
    </div>
  );
});

export default WishTableItem;
