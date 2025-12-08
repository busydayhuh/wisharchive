import type { AccessRoles } from "@/features/collaborators";
import { BookButton, WishImage } from "@/features/wish";
import type { LinkParams, WishDocumentType } from "@/shared/types";
import { PRIVACY_ICONS } from "@/shared/ui/components/Badges";
import { cn } from "@/shared/utils/css";
import { memo } from "react";
import { Link } from "react-router";
import { QuickActions } from "./QuickActions";

export const WishGalleryCover = memo(function WishGalleryCover({
  wish,
  onEditWish,
  userRoles,
  linkParams,
  isMobile,
}: {
  wish: WishDocumentType;
  onEditWish: () => void;
  userRoles?: AccessRoles;
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
              isBookedByCurrentUser={userRoles?.isBooker ?? false}
            />
          )}
        </div>
      )}
    </div>
  );
});
