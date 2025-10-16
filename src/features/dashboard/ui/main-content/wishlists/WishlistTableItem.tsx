import { CollaboratorsAvatars } from "@/features/collaborators";
import { useWishlistcardMeta } from "@/features/dashboard/model/useWishlistcardMeta";
import { BookmarkButton, EditWishlistButton } from "@/features/wishlist";
import "@/shared/assets/custom.css";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { RoleBadge } from "@/shared/ui/Badges";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { EyeClosed } from "lucide-react";
import { memo, useMemo } from "react";
import { href, Link } from "react-router";
import { ImageTiles } from "./ImageTiles";

interface WishlistTableItemProps {
  wishlist: WishlistDocumentType;
}

const WishlistTableItem = memo(function WishlistTableItem({
  wishlist,
}: WishlistTableItemProps) {
  const {
    collaborators,
    bookmarkWishlist,
    isFavorite,
    onSharedPage,
    openWishlistEditor,
    userRoles,
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
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <ImageTiles wishes={wishlist.wishes} variant="table" />
      </Link>

      {/* Заголовок и счетчик желаний */}
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <div className="flex flex-col gap-1 lg:basis-2xs">
          <div className="flex items-center gap-2 pr-1 font-medium text-base 2xl:text-lg">
            <p className="max-w-[42ch] truncate">{wishlist.title}</p>
            {wishlist.isPrivate && (
              <EyeClosed className="size-3 md:size-4 text-muted-foreground" />
            )}
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
            size="default"
            maxVisible={5}
            className="mt-1"
            hideOwner
          />
        )}
      </div>

      {/* Даты */}
      <div className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground text-xs xl:text-sm">
        <p className="bg-muted px-1.5 py-0.5 rounded-lg">создан</p>
        <p>{createdAt}</p>
      </div>
      <div className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground text-xs xl:text-sm">
        <p className="bg-muted px-1.5 py-0.5 rounded-lg">изменён</p>
        <p>{updatedAt}</p>
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
});

export default WishlistTableItem;
