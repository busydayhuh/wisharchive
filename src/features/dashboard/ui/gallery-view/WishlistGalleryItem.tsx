import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Badge } from "@/shared/ui/kit/badge";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import usePermissions from "../../model/checkPermissions";
import { BookmarkButton } from "../ActionButtons";
import AvatarsGroup from "../AvatarsGroup";
import ImageTiles from "../ImageTiles";
import { useDashboardContext } from "../layouts/DashboardLayout";
import OwnerAvatar from "../OwnerAvatar";
import WishlistEditDialog from "../WishlistEditDialog";

const WishlistGalleryItem = memo(function WishlistGalleryItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const { path, authUser } = useDashboardContext();
  const { isOwner, isFavorite, isEditor } = usePermissions(
    authUser!.$id,
    wishlist
  );

  return (
    <div className="group/cover flex flex-col gap-1 mb-4">
      <div className="relative">
        <BookmarkButton isFavorite={isFavorite || path === "/bookmarks"} />

        {(isOwner || isEditor) && (
          <WishlistEditDialog
            actionVariant="edit"
            triggerVariant="gallery"
            wishlist={wishlist}
            isOwner={isOwner}
          />
        )}

        <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
          <ImageTiles wishes={wishlist.wishes} />
        </Link>
      </div>

      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <div className="flex justify-between items-center px-2">
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
          {wishlist.collaborators && (
            <AvatarsGroup
              users={wishlist.collaborators}
              size={5}
              maxCount={3}
              className="mt-1"
            />
          )}
        </div>
      </Link>

      <div className="flex justify-between items-center px-2">
        {(path === "/bookmarks" || path === "/shared") && (
          <OwnerAvatar
            userId={wishlist.ownerId}
            userName={wishlist.owner.userName}
            avatarURL={wishlist.owner.avatarURL}
          />
        )}

        {wishlist.wishes && (
          <span className="text-muted-foreground text-xs md:text-sm">
            {wishlist.wishes.length} жел.
          </span>
        )}
      </div>
    </div>
  );
});

export default WishlistGalleryItem;
