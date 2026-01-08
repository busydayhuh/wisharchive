import type { WishcardMeta } from "@/features/dashboard/model/hooks/useWishcardMeta";
import { BookButton } from "@/features/wish";
import type { WishDocumentType } from "@/shared/types";
import { PRIVACY_ICONS } from "@/shared/ui/components/Badges";
import { WishImage } from "@/shared/ui/components/WishImage";
import { cn } from "@/shared/utils/css";
import { memo } from "react";
import { Link } from "react-router-dom";
import { QuickActions } from "./QuickActions";

export const WishGalleryCover = memo(function WishGalleryCover({
  wish,
  meta,
}: {
  wish: WishDocumentType;
  meta: WishcardMeta;
}) {
  const { linkParams, isMobile, userRoles, onEditWish, onListPage } = meta;

  return (
    <div className={cn("relative rounded-2xl overflow-hidden")}>
      <Link to={linkParams.to} state={linkParams.state}>
        <WishImage
          wishId={wish.$id}
          isPrivate={wish.wishlist?.isPrivate ?? false}
          withBlur={!onListPage}
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
              isBookedByCurrentUser={userRoles?.isBooker ?? false}
            />
          )}
        </div>
      )}
    </div>
  );
});
