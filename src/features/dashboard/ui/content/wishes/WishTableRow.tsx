import { useWishcardMeta } from "@/features/dashboard/model/hooks/useWishcardMeta";
import { BookButton, FormattedPrice, WishImage } from "@/features/wish";
import { WishlistControls } from "@/features/wishlist-controls";
import "@/shared/assets/custom.css";
import { cn } from "@/shared/lib/css";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, PRIVACY_ICONS, ShopBadge } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { Link } from "react-router";
import { QuickActions } from "./QuickActions";

function WishTableRow({ wish }: { wish: WishDocumentType }) {
  const { linkParams, onEditWish, userRoles, showOwner, onListPage, isMobile } =
    useWishcardMeta(wish);
  const { isWishOwner, isBooker, isEditor } = userRoles;

  return (
    <div
      className={cn(
        "wish-table-grid relative items-center md:px-1 py-1 md:py-2 w-full transition"
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
        {showOwner ? (
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
        <WishlistControls
          wish={wish}
          roles={userRoles}
          className="w-fit h-9 font-medium text-xs lg:text-sm"
          wishlist={wish.wishlist}
          variant="table"
        />
      </div>

      {/* Быстрые действия / забронировать */}
      <div className="justify-self-end lg:justify-self-center">
        {onListPage && (isWishOwner || isEditor) ? (
          <WishlistControls
            wish={wish}
            roles={userRoles}
            className="w-fit h-9 font-medium text-xs lg:text-sm"
            wishlist={wish.wishlist}
            variant="table"
          />
        ) : isWishOwner ? (
          <QuickActions
            imageURL={wish.imageURL ?? undefined}
            wishId={wish.$id}
            title={wish.title}
            triggerVariant="table"
            side="bottom"
            align="end"
            isArchived={wish.isArchived}
            onEditWish={onEditWish}
          />
        ) : (
          <BookButton
            wishTitle={wish.title}
            imageURL={wish.imageURL ?? undefined}
            wishId={wish.$id}
            triggerVariant="table"
            isBooked={wish.isBooked}
            isBookedByCurrentUser={isBooker ?? false}
          />
        )}
      </div>
    </div>
  );
}

export default WishTableRow;
