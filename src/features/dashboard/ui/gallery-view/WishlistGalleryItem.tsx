import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Badge } from "@/shared/ui/kit/badge";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import usePermissions from "../../model/usePermissions";
import { BookmarkButton, EditButton } from "../ActionButtons";
import AvatarsGroup from "../AvatarsGroup";
import ImageTiles from "../ImageTiles";
import { useDashboardContext } from "../layouts/DashboardLayout";
import OwnerAvatar from "../OwnerAvatar";

const WishlistGalleryItem = memo(function WishlistGalleryItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const { isOwner, isFavorite } = usePermissions(wishlist);
  const { path } = useDashboardContext();

  return (
    <div className="group/cover flex flex-col gap-2 mb-4">
      <div className="relative">
        <BookmarkButton isFavorite={isFavorite || path === "/bookmarks"} />
        {isOwner && <EditButton />}
        <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
          <ImageTiles wishes={wishlist.wishes} />
        </Link>
      </div>
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <div className="flex justify-between items-baseline px-2">
          <span className="pr-1 font-medium text-base md:text-lg truncate">
            {wishlist.title}
          </span>
          {wishlist.isPrivate && (
            <Badge
              className="ms-1 me-auto px-1 py-1 rounded-full text-foreground"
              variant="outline"
            >
              <Lock className="size-3" />
            </Badge>
          )}
          {wishlist.wishes ? (
            <span className="text-xs md:text-sm">
              ( {wishlist.wishes.length} )
            </span>
          ) : (
            <span className="text-muted-foreground text-sm md:text-base">
              ( 0 )
            </span>
          )}
        </div>
      </Link>
      <div className="flex justify-between items-center px-2">
        {path === "/bookmarks" && (
          <OwnerAvatar
            userId={wishlist.ownerId}
            userName={wishlist.owner.userName}
            avatarURL={wishlist.owner.avatarURL}
          />
        )}
        {wishlist.isPrivate && wishlist.canRead && (
          <AvatarsGroup
            users={wishlist.canRead}
            size={4}
            maxCount={3}
            className="mt-0"
          />
        )}
      </div>
    </div>
  );
});

export default WishlistGalleryItem;
