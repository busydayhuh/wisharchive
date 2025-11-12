import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import {
  BookButton,
  FormattedPrice,
  QuickActions,
  WishImage,
} from "@/features/wish";
import "@/shared/assets/custom.css";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, PRIVACY_ICONS, ShopBadge } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo } from "react";
import { Link } from "react-router";
import { WishlistControl } from "./WishlistControl";

const WishTableItem = memo(function WishTableItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { userRoles, onBookedPage, onListPage, linkParams } =
    useWishcardMeta(wish);

  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "relative items-center gap-2 grid grid-cols-[3fr_1fr] md:grid-cols-[22rem_1fr_1fr_0.5fr] lg:grid-cols-[28rem_1fr_1fr_1fr_0.5fr] 2xl:grid-cols-[54rem_1fr_1fr_1fr_0.5fr] xl:grid-cols-[40rem_1fr_1fr_1fr_0.5fr] md:px-1 py-1 md:py-2 w-full transition"
      )}
    >
      {/* Картинка */}
      <Link
        to={linkParams.to}
        state={linkParams.state}
        className="group-card-wrapper flex items-center"
      >
        <div className="relative">
          <WishImage
            wishId={wish.$id}
            url={wish.imageURL}
            alt={wish.title}
            isBooked={wish.isBooked}
            variant="table"
          />
          {isMobile && wish.wishlist?.isPrivate && (
            <div className="top-2 left-2 absolute flex justify-center items-center rounded-full w-6 h-6 overflow-clip">
              {PRIVACY_ICONS.private}
            </div>
          )}
        </div>

        {/* Название и цена */}
        <div className="flex flex-col gap-1 px-4 lg:px-8">
          <p className="max-w-[40ch] overflow-hidden font-semibold text-sm md:text-base break-words text-ellipsis line-clamp-2">
            {wish.title}
          </p>

          {!!wish.price && (
            <FormattedPrice
              price={wish.price}
              currency={wish.currency}
              className="text-muted-foreground text-sm lg:text-base"
            />
          )}
        </div>
      </Link>
      <PriorityBadge
        priority={wish.priority}
        size="md"
        className="hidden md:inline-flex justify-self-center 2xl:text-sm"
      />

      {/* Ссылка на магазин / владелец желания */}
      {/* Отображается при w >= 1024px */}
      <div className="hidden lg:block justify-self-center">
        {onBookedPage || onListPage ? (
          <OwnerAvatar
            userId={wish.ownerId}
            userName={wish.owner.userName}
            avatarURL={wish.owner.avatarURL}
          />
        ) : (
          wish.shopURL && (
            <ShopBadge shopURL={wish.shopURL} className="2xl:text-sm" />
          )
        )}
      </div>

      {/* Управление вишлистом */}
      {/* Отображается при w >= 768px */}
      <div className="hidden md:block justify-self-end md:justify-self-center">
        <WishlistControl
          className="w-fit h-9 font-medium text-xs lg:text-sm"
          isOwner={userRoles?.isWishOwner ?? false}
          onListPage={!!onListPage}
          isEditor={userRoles?.isEditor ?? false}
          wishlist={wish.wishlist}
          wishId={wish.$id}
          variant="table"
        />
      </div>

      {/* Быстрые действия / забронировать */}
      <div className="justify-self-end lg:justify-self-center">
        {onListPage && (userRoles?.isWishOwner || userRoles?.isEditor) ? (
          <WishlistControl
            className="w-fit h-9 font-medium text-xs lg:text-sm"
            isOwner={userRoles?.isWishOwner ?? false}
            onListPage={!!onListPage}
            isEditor={userRoles?.isEditor ?? false}
            wishlist={wish.wishlist}
            wishId={wish.$id}
            variant="table"
          />
        ) : userRoles?.isWishOwner ? (
          <QuickActions
            wishId={wish.$id}
            title={wish.title}
            triggerVariant="table"
            side="bottom"
            align="end"
            isArchived={wish.isArchived}
            linkState={linkParams.state}
          />
        ) : (
          <BookButton
            wishId={wish.$id}
            triggerVariant="table"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={userRoles?.isBooker ?? false}
          />
        )}
      </div>
    </div>
  );
});

export default WishTableItem;
