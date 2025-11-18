import { CollaboratorsAvatars } from "@/features/collaborators";
import { useWishlistcardMeta } from "@/features/dashboard/model/useWishlistcardMeta";
import { BookmarkButton, EditWishlistButton } from "@/features/wishlist";
import "@/shared/assets/custom.css";
import type { WishlistDocumentType } from "@/shared/model/types";
import { PRIVACY_ICONS, RoleBadge } from "@/shared/ui/Badges";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useMemo } from "react";
import { Link } from "react-router";
import { ImageTiles } from "./ImageTiles";

interface WishlistTableItemProps {
  wishlist: WishlistDocumentType;
}

function WishlistTableItem({ wishlist }: WishlistTableItemProps) {
  const {
    collaborators,
    bookmarkWishlist,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
    userRoles,
    linkParams,
  } = useWishlistcardMeta(wishlist);

  const createdAt = useMemo(
    () => format(wishlist.$createdAt, "PP", { locale: ru }),
    [wishlist.$createdAt]
  );

  const updatedAt = useMemo(
    () => format(wishlist.$updatedAt, "PP", { locale: ru }),
    [wishlist.$updatedAt]
  );

  return (
    <div className="wl-table-grid relative items-center py-2 pl-2 md:pl-0">
      {/* Превью желаний */}
      <Link {...linkParams} className="relative">
        <ImageTiles wishes={wishlist.wishes} variant="table" />
        {wishlist.isPrivate && (
          <div className="top-4 left-0 absolute flex justify-center items-center rounded-full w-6 md:w-8 h-6 md:h-8 overflow-clip">
            {PRIVACY_ICONS.private}
          </div>
        )}
      </Link>

      {/* Заголовок и счетчик желаний */}
      <Link {...linkParams}>
        <div className="flex flex-col gap-1 lg:basis-2xs">
          <div className="flex items-center gap-2 pr-1 font-semibold text-base 2xl:text-lg">
            <p className="max-w-[42ch] truncate">{wishlist.title}</p>
          </div>

          {onSharedPage ? (
            userRoles && <RoleBadge roles={userRoles} size="sm" />
          ) : (
            <p className="text-muted-foreground text-xs">
              {wishlist.wishes?.length ?? 0} жел.
            </p>
          )}
        </div>
      </Link>

      {/* Соавторы */}
      <div className="hidden sm:flex justify-self-center">
        {collaborators && (
          <CollaboratorsAvatars
            collaborators={collaborators}
            size="md"
            maxVisible={5}
            className="mt-1"
            hideOwner
          />
        )}
      </div>

      {/* Даты */}
      <div className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground">
        <p className="bg-muted px-1.5 py-0.5 rounded-lg text-xs">создан</p>
        <p className="text-sm">{createdAt}</p>
      </div>
      <div className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground">
        <p className="bg-muted px-1.5 py-0.5 rounded-lg text-xs">изменён</p>
        <p className="text-sm">{updatedAt}</p>
      </div>

      {/* Кнопки */}
      <div className="flex justify-end md:justify-evenly items-center">
        {(userRoles?.isWishlistOwner || userRoles?.isEditor) && (
          <EditWishlistButton
            onClick={openWishlistEditor}
            className="hidden md:inline-flex"
          />
        )}
        <BookmarkButton
          variant="table"
          isFavorite={isFavorite}
          onPressed={bookmarkWishlist}
        />
      </div>
    </div>
  );
}

export default WishlistTableItem;
