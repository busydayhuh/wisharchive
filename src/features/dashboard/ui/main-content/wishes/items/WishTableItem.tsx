import { useWishcardMeta } from "@/features/dashboard/model/useWishcardMeta";
import {
  BookButton,
  FormattedPrice,
  useWishQuickActions,
  WishImage,
  WishlistSelect,
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

const WishTableItem = memo(function WishTableItem({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { isOwner, isBooker, isEditor, bookWish, onBookedPage, onListPage } =
    useWishcardMeta(wish);
  const { changeWishlist } = useWishQuickActions(wish.$id);

  return (
    <div
      className={cn(
        "relative items-center grid grid-cols-[3fr_1fr] md:grid-cols-[26rem_1fr_1fr_1fr] lg:grid-cols-[32rem_1fr_1fr_1fr_0.5fr] 2xl:grid-cols-[54rem_1fr_1fr_1fr_0.5fr] xl:grid-cols-[42rem_1fr_1fr_1fr_0.5fr] md:px-1 py-1 md:py-2 w-full transition"
      )}
    >
      <div className="group-card-wrapper flex items-center">
        {/* Картинка */}
        <Link to={href(ROUTES.WISH, { wishId: wish.$id })}>
          <WishImage
            wishId={wish.$id}
            url={wish.imageURL}
            alt={wish.title}
            isBooked={wish.isBooked}
            variant="table"
          />
        </Link>

        {/* Название и цена */}
        <Link
          to={href(ROUTES.WISH, { wishId: wish.$id })}
          className="flex flex-col gap-2 me-auto px-4"
        >
          <div className="flex flex-col gap-1">
            <span className="max-w-[40ch] overflow-hidden font-medium text-sm md:text-base xl:text-lg break-words text-ellipsis line-clamp-2">
              {wish.title}
            </span>

            {!!wish.price && (
              <FormattedPrice
                price={wish.price}
                currency={wish.currency}
                className="text-muted-foreground text-sm lg:text-base xl:text-lg"
              />
            )}
          </div>
        </Link>
      </div>
      <PriorityBadge
        priority={wish.priority}
        size="md"
        className="hidden md:inline-flex 2xl:text-sm"
      />

      {/* Вишлист / владелец желания */}
      {/* Отображается при w >= 768px */}
      <div className="hidden md:block">
        {onBookedPage || onListPage ? (
          <OwnerAvatar
            userId={wish.ownerId}
            userName={wish.owner.userName}
            avatarURL={wish.owner.avatarURL}
          />
        ) : (
          <WishlistSelect
            value={wish.wishlist?.$id ?? "none"}
            onValueChange={(newWlId: string) => {
              changeWishlist(newWlId === "none" ? null : newWlId);
            }}
            className="w-fit max-w-[16ch] h-9 md:h-11 font-medium text-xs lg:text-sm truncate"
          />
        )}
      </div>

      {/* Ссылка на магазин */}
      {/* Отображается при w >= 1024px */}
      <div className="hidden lg:block">
        {wish.shopURL && (
          <ShopBadge shopURL={wish.shopURL} className="2xl:text-sm" />
        )}
      </div>

      {/* Экшен-кнопки */}
      <div className="flex md:flex-row flex-col gap-1 md:gap-4">
        {(isOwner || isEditor) && (
          <WishQuickActions
            wishId={wish.$id}
            title={wish.title}
            triggerVariant="table"
            side="bottom"
            align="end"
            isArchived={wish.isArchived}
          />
        )}

        {!isOwner && (
          <BookButton
            triggerVariant="table"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={isBooker}
            action={bookWish}
          />
        )}
      </div>
    </div>
  );
});

export default WishTableItem;
