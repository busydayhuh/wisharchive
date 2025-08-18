import { useAuth } from "@/features/auth";
import {
  EditWishlistButton,
  useWishlistDialog,
  useWishlistRoles,
} from "@/features/list";

import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import AvatarsGroup from "@/shared/ui/AvatarsGroup";
import { Badge } from "@/shared/ui/kit/badge";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { Lock } from "lucide-react";
import { memo } from "react";
import { href, Link, useLocation } from "react-router-dom";
import { BookmarkButton } from "../actions/BookmarkButton";
import ImageTiles from "./ImageTiles";

const WishlistGalleryItem = memo(function WishlistGalleryItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const { pathname } = useLocation();
  const { current: authUser } = useAuth();

  const { openDialog } = useWishlistDialog();

  const { isOwner, isFavorite, isEditor } = useWishlistRoles(
    authUser?.$id ?? "",
    wishlist.$id
  );

  function onEditClick() {
    openDialog("edit", wishlist.$id);
  }

  return (
    <>
      <div className="group/cover flex flex-col gap-1 mb-4">
        <div className="relative">
          {/* Добавить в закладки */}
          <BookmarkButton
            isFavorite={isFavorite || pathname === "/bookmarks"}
          />

          {/* Редактировать */}
          {(isOwner || isEditor) && (
            <EditWishlistButton onClick={onEditClick} variant="gallery" />
          )}

          {/* Стопка картинок */}
          <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
            <ImageTiles wishes={wishlist.wishes} />
          </Link>
        </div>

        <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
          <div className="flex justify-between items-center px-2">
            {/* Название */}
            <span className="pr-1 font-medium text-base md:text-lg truncate">
              {wishlist.title}
            </span>

            {/* Бейдж приватности */}
            {wishlist.isPrivate && (
              <Badge
                className="ms-1 me-auto px-1 py-1 rounded-full text-foreground"
                variant="outline"
              >
                <Lock className="size-3" />
              </Badge>
            )}

            {/* Соавторы */}
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
          {/* Владелец списка (если список чужой) */}
          {(pathname === "/bookmarks" || pathname === "/shared") && (
            <OwnerAvatar
              userId={wishlist.ownerId}
              userName={wishlist.owner.userName}
              avatarURL={wishlist.owner.avatarURL}
            />
          )}

          {/* Счетчик желаний */}
          <span className="text-muted-foreground text-xs md:text-sm">
            {wishlist.wishes?.length ?? 0} жел.
          </span>
        </div>
      </div>
    </>
  );
});

export default WishlistGalleryItem;
