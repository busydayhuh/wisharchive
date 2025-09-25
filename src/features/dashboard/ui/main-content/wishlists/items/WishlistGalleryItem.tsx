import { CollaboratorsAvatars } from "@/features/collaborators";
import { useWishlistcardMeta } from "@/features/dashboard/model/useWishlistcardMeta";
import { BookmarkButton, EditWishlistButton } from "@/features/wishlist";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { EyeOffIcon } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import ImageTiles from "./ImageTiles";

const WishlistGalleryItem = memo(function WishlistGalleryItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const {
    collaborators,
    toggleBookmark,
    isOwner,
    isEditor,
    isFavorite,
    onBookmarksPage,
    onSharedPage,
    onEdit,
  } = useWishlistcardMeta(wishlist);

  return (
    <>
      <div className="group/cover flex flex-col gap-1 mb-4">
        <div className="relative">
          {/* Добавить в закладки */}
          <BookmarkButton
            isFavorite={isFavorite || onBookmarksPage}
            onPressed={toggleBookmark}
          />

          {/* Редактировать */}
          {(isOwner || isEditor) && (
            <EditWishlistButton onClick={onEdit} variant="gallery" />
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
              <span className="max-w-[10ch] sm:max-w-[20ch] font-medium truncate leading-tight">
                {wishlist.title}
              </span>
              {wishlist.isPrivate && (
                <EyeOffIcon className="size-4 text-muted-foreground" />
              )}
            </div>

            {/* Соавторы */}
            {collaborators && (
              <CollaboratorsAvatars
                collaborators={collaborators}
                size={5}
                maxVisible={3}
                className="mt-1"
                hideOwner={true}
              />
            )}
          </div>
        </Link>

        {/* Счетчик желаний / роль */}
        <div className="flex justify-between items-end px-2">
          <span
            className={cn(
              "text-xs",
              onSharedPage
                ? [
                    "px-1.5 pb-0.5 rounded-lg text-foreground",
                    isEditor ? "bg-blue-200" : "bg-yellow-200",
                  ]
                : "text-muted-foreground md:text-sm"
            )}
          >
            {onSharedPage
              ? isEditor
                ? "редактор"
                : "читатель"
              : `${wishlist.wishes?.length ?? 0} жел.`}
          </span>
        </div>
      </div>
    </>
  );
});

export default WishlistGalleryItem;
