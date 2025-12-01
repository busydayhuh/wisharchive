import { useWishcardMeta } from "@/features/dashboard/model/hooks/useWishcardMeta";
import { FormattedPrice } from "@/features/wish";
import { WishlistControls } from "@/features/wishlist-controls";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { Link } from "react-router";
import { WishGalleryCover } from "./WishGalleryCover";

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
      <WishGalleryCover
        wish={wish}
        userRoles={userRoles}
        linkParams={linkParams}
        onEditWish={onEditWish}
        isMobile={isMobile}
      />

      {!wish.isArchived && (
        <WishlistControls
          wish={wish}
          wishlist={wish.wishlist}
          variant="gallery"
          roles={userRoles}
          className={cn(
            "top-3 right-3 absolute w-fit font-medium md:text-sm 2xl:text-sm"
          )}
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

export default WishGalleryCard;
