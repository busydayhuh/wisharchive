import { CollaboratorsGroup } from "@/features/collaborators";
import { useWishlistcardMeta } from "@/features/dashboard/model/hooks/useWishlistcardMeta";
import { BookmarkButton, EditWishlistButton } from "@/features/wishlist";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import type { WishlistDocumentType } from "@/shared/types";
import { RoleBadge } from "@/shared/ui/components/Badges";
import OwnerAvatar from "@/shared/ui/components/OwnerAvatar";
import { EyeClosed } from "lucide-react";
import { Link } from "react-router-dom";
import { WishlistTiles } from "./WishlistTiles";

function WishlistGalleryCard({ wishlist }: { wishlist: WishlistDocumentType }) {
  const {
    collaborators,
    toggleBookmark,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
    userRoles,
    linkParams,
    inBookmarks,
    owner,
  } = useWishlistcardMeta(wishlist);

  const isMobile = useIsMobile();

  return (
    <div className="group-card-wrapper flex flex-col gap-1 mb-4">
      <div className="relative">
        {/* Добавить в закладки */}
        <BookmarkButton
          isFavorite={isFavorite}
          onPressed={toggleBookmark}
          className="top-2 right-2 z-10 absolute"
        />

        {/* Редактировать */}
        {(userRoles?.isWishlistOwner || userRoles?.isEditor) && !isMobile && (
          <EditWishlistButton
            onClick={openWishlistEditor}
            className="right-2 bottom-2 absolute show-actions"
          />
        )}

        {/* Стопка картинок */}
        <Link {...linkParams} className="block relative">
          <WishlistTiles wishes={wishlist.wishes} />
          {wishlist.isPrivate && (
            <div className="top-3 left-3 absolute flex justify-center items-center bg-pink-bg shadow-xs rounded-full size-7 overflow-clip text-foreground">
              <EyeClosed className="size-3" />
            </div>
          )}
        </Link>
      </div>

      <Link {...linkParams}>
        <div className="flex justify-between items-center mt-1 px-2">
          {/* Название */}
          <p className="pr-2 max-w-full sm:max-w-[20ch] min-h-6 font-semibold text-base md:text-lg truncate leading-tight">
            {wishlist.title}
          </p>

          {/* Соавторы */}
          {inBookmarks ? (
            <OwnerAvatar
              userId={wishlist.ownerId}
              userName={owner?.userName ?? ""}
              avatarURL={owner?.avatarURL ?? null}
              size="sm"
              className="[&_.owner-name]:hidden"
            />
          ) : (
            collaborators && (
              <CollaboratorsGroup
                collaborators={collaborators}
                size="sm"
                maxVisible={3}
                hideOwner={true}
              />
            )
          )}
        </div>
      </Link>

      {/* Счетчик желаний / роль */}
      {onSharedPage ? (
        userRoles && <RoleBadge roles={userRoles} size="sm" className="mx-2" />
      ) : (
        <p className="mx-2 text-muted-foreground text-xs">
          {wishlist.wishes?.length ?? 0} жел.
        </p>
      )}
    </div>
  );
}

export default WishlistGalleryCard;
