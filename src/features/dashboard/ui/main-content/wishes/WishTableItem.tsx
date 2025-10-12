import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import {
  BookButton,
  FormattedPrice,
  WishImage,
  WishQuickActions,
} from "@/features/wish";
import "@/shared/assets/custom.css";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, ShopBadge } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { memo } from "react";
import { href, Link } from "react-router";
import { WishlistControl } from "./WishlistControl";

const WishTableItem = memo(function WishTableItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { userRoles, onBookedPage, onListPage, hasAccess } =
    useWishcardMeta(wish);

  if (!hasAccess) return null;

  return (
    <div
      className={cn(
        "relative items-center gap-2 grid grid-cols-[3fr_1fr] md:grid-cols-[22rem_1fr_1fr_0.5fr] lg:grid-cols-[28rem_1fr_1fr_1fr_0.5fr] 2xl:grid-cols-[54rem_1fr_1fr_1fr_0.5fr] xl:grid-cols-[40rem_1fr_1fr_1fr_0.5fr] md:px-1 py-1 md:py-2 w-full transition"
      )}
    >
      {/* Картинка */}
      <Link
        to={href(ROUTES.WISH, { wishId: wish.$id })}
        className="group-card-wrapper flex items-center"
      >
        <WishImage
          wishId={wish.$id}
          url={wish.imageURL}
          alt={wish.title}
          isBooked={wish.isBooked}
          variant="table"
        />

        {/* Название и цена */}
        <div className="flex flex-col gap-2 px-4 lg:px-8">
          <div className="flex flex-col gap-1">
            <p className="max-w-[40ch] overflow-hidden font-medium text-sm md:text-base break-words text-ellipsis line-clamp-2">
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
      <div className="hidden md:block justify-self-center">
        <WishlistControl
          className="hover:bg-secondary/70 md:py-5 w-fit max-w-[16ch] lg:max-w-[24ch] h-9 font-medium text-xs lg:text-sm truncate"
          isOwner={userRoles?.isWishOwner ?? false}
          onListPage={!!onListPage}
          isEditor={userRoles?.isEditor ?? false}
          wishlist={wish.wishlist}
          wishId={wish.$id}
          variant="table"
        />
      </div>

      {/* Быстрые действия / забронировать */}
      <div className="justify-self-end md:justify-self-center">
        {userRoles?.isWishOwner ? (
          <WishQuickActions
            wishId={wish.$id}
            title={wish.title}
            triggerVariant="table"
            side="bottom"
            align="end"
            isArchived={wish.isArchived}
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
