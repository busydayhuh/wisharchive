import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Badge } from "@/shared/ui/kit/badge";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import useIsFavored from "../../model/useIsFavored";
import { BookmarkButton, EditButton } from "../ActionButtons";
import AvatarsGroup from "../AvatarsGroup";
import ImageTiles from "../ImageTiles";

const WishlistGalleryItem = memo(function WishlistGalleryItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const isFavoredByCurrentUser = useIsFavored(wishlist.favoredBy);

  return (
    <div className="group/cover flex flex-col gap-1 mb-4">
      <div className="relative">
        <BookmarkButton isFavored={isFavoredByCurrentUser} />
        <EditButton />
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
            <span className="text-sm md:text-base">
              ( {wishlist.wishes.length} )
            </span>
          ) : (
            " (0) "
          )}
        </div>
        {wishlist.isPrivate && wishlist.canRead && (
          <AvatarsGroup
            users={wishlist.canRead}
            size={5}
            maxCount={3}
            className="px-2"
          />
        )}
      </Link>
    </div>
  );
});

export default WishlistGalleryItem;
