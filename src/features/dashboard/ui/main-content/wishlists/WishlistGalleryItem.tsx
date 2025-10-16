import { CollaboratorsAvatars } from "@/features/collaborators";
import { useWishlistcardMeta } from "@/features/dashboard/model/useWishlistcardMeta";
import { BookmarkButton, EditWishlistButton } from "@/features/wishlist";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { PRIVACY_ICONS, RoleBadge } from "@/shared/ui/Badges";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import { ImageTiles } from "./ImageTiles";

const WishlistGalleryItem = memo(function WishlistGalleryItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const {
    collaborators,
    bookmarkWishlist,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
    userRoles,
  } = useWishlistcardMeta(wishlist);

  return (
    <>
      <div className="group-card-wrapper flex flex-col gap-1 mb-4">
        <div className="relative">
          {/* Добавить в закладки */}
          <BookmarkButton
            isFavorite={isFavorite}
            onPressed={bookmarkWishlist}
            className="top-2 right-2 z-10 absolute"
          />

          {/* Редактировать */}
          {(userRoles?.isWishlistOwner || userRoles?.isEditor) && (
            <EditWishlistButton
              onClick={openWishlistEditor}
              className="right-2 bottom-2 absolute show-actions"
            />
          )}

          {/* Стопка картинок */}
          <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
            <ImageTiles wishes={wishlist.wishes} />
          </Link>
        </div>

        <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
          <div className="flex flex-wrap justify-between items-center mt-1 px-2">
            {/* Название */}
            <div className="flex items-center gap-2 pr-2 text-base md:text-lg">
              <p className="max-w-[10ch] sm:max-w-[20ch] font-medium truncate leading-tight">
                {wishlist.title}
              </p>
              {wishlist.isPrivate &&
                //
                PRIVACY_ICONS.private}
            </div>

            {/* Соавторы */}
            {collaborators && (
              <CollaboratorsAvatars
                collaborators={collaborators}
                size="sm"
                maxVisible={3}
                className="mt-1"
                hideOwner={true}
              />
            )}
          </div>
        </Link>

        {/* Счетчик желаний / роль */}
        {onSharedPage ? (
          userRoles && (
            <RoleBadge roles={userRoles} size="sm" className="mx-2" />
          )
        ) : (
          <p className="mx-2 text-muted-foreground text-xs">
            {wishlist.wishes?.length ?? 0} жел.
          </p>
        )}
      </div>
    </>
  );
});

export default WishlistGalleryItem;
