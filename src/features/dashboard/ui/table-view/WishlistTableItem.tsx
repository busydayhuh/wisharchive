import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Badge } from "@/shared/ui/kit/badge";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router";
import usePermissions from "../../model/checkPermissions";
import { BookmarkButton } from "../ActionButtons";
import AvatarsGroup from "../AvatarsGroup";
import ImageTiles from "../ImageTiles";
import { useDashboardContext } from "../layouts/DashboardLayout";
import OwnerAvatar from "../OwnerAvatar";
import WishlistEditDialog from "../WishlistEditDialog";

const WishlistTableItem = memo(function WishlistTableItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const { path, authUser } = useDashboardContext();
  const { isOwner, isFavorite } = usePermissions(authUser!.$id, wishlist);

  return (
    <div className="items-center gap-3 md:gap-4 lg:gap-6 grid grid-cols-[5rem_10rem_1fr_1fr] md:grid-cols-[5rem_2fr_1fr_1fr] lg:grid-cols-[fit-content(128px)_2fr_1fr_1fr_1fr_1fr_1fr] pt-2 pb-4 md:pb-2 lg:pb-0 pl-2 md:pl-3 transition dot-on-hover list">
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <ImageTiles wishes={wishlist.wishes} variant="table" />
      </Link>
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <div className="flex flex-col lg:basis-2xs">
          <span className="pr-1 font-medium text-base md:text-lg truncate">
            {wishlist.title}
            {wishlist.isPrivate && (
              <Badge className="bg-transparent ms-2 px-1 py-1 rounded-full text-foreground">
                <Lock className="size-3" />
              </Badge>
            )}
          </span>
          <span className="text-xs md:text-sm">{`${
            wishlist.wishes ? wishlist.wishes.length : 0
          } жел.`}</span>
          {wishlist.collaborators && (
            <AvatarsGroup
              users={wishlist.collaborators}
              size={5}
              maxCount={3}
              className="lg:hidden flex mt-1"
            />
          )}
        </div>
      </Link>
      <div className="justify-self-center md:justify-self-start">
        {(path === "/bookmarks" || path === "/shared") && (
          <OwnerAvatar
            userId={wishlist.ownerId}
            userName={wishlist.owner.userName}
            avatarURL={wishlist.owner.avatarURL}
          />
        )}
      </div>
      <div className="hidden lg:flex justify-self-center md:justify-self-start">
        {wishlist.collaborators ? (
          <AvatarsGroup users={wishlist.collaborators} size={6} maxCount={4} />
        ) : null}
      </div>
      <div className="hidden lg:block w-fit text-sm">
        создан: {format(wishlist.$createdAt, "PPp", { locale: ru })}
      </div>
      <div className="hidden lg:block w-fit text-sm">
        изменен: {format(wishlist.$updatedAt, "PPp", { locale: ru })}
      </div>

      <div className="flex justify-end lg:justify-around align-middle">
        {isOwner && (
          <WishlistEditDialog
            actionVariant="edit"
            triggerVariant="table"
            wishlist={wishlist}
          />
        )}
        <BookmarkButton
          variant="table"
          isFavorite={isFavorite || path === "/bookmarks"}
        />
      </div>
    </div>
  );
});

export default WishlistTableItem;
