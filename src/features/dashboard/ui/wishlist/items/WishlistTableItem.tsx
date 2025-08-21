import {
  EditWishlistButton,
  useWishlistDialog,
  useWishlistRoles,
} from "@/features/list";
import "@/shared/assets/custom.css";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Badge } from "@/shared/ui/kit/badge";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Lock } from "lucide-react";
import { memo, useMemo } from "react";
import { href, Link, useLocation } from "react-router";
import { BookmarkButton } from "../actions/BookmarkButton";

import { useAuth } from "@/features/auth";
import { CollaboratorsAvatars } from "@/features/collaborators";
import { useCollaborators } from "@/features/collaborators/";
import ImageTiles from "./ImageTiles";

interface WishlistTableItemProps {
  wishlist: WishlistDocumentType;
}

const WishlistTableItem = memo(function WishlistTableItem({
  wishlist,
}: WishlistTableItemProps) {
  const { pathname } = useLocation();
  const { current: authUser } = useAuth();
  const { collaborators } = useCollaborators(wishlist.$id);

  const dialogContext = useWishlistDialog();

  const { isOwner, isFavorite, isEditor } = useWishlistRoles(
    authUser?.$id ?? "",
    wishlist.$id
  );

  const createdAt = useMemo(
    () => format(wishlist.$createdAt, "PP", { locale: ru }),
    [wishlist.$createdAt]
  );

  const updatedAt = useMemo(
    () => format(wishlist.$updatedAt, "PP", { locale: ru }),
    [wishlist.$updatedAt]
  );

  const showWishlistOwner = pathname === "/bookmarks" || pathname === "/shared";

  function onEditClick() {
    dialogContext.openDialog("edit", wishlist.$id);
  }

  return (
    <div className="wl-table-grid relative items-center md:px-1 pt-2 pb-4 md:pb-8 lg:pb-2 transition dot-on-hover">
      {/* Превью желаний */}
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <ImageTiles wishes={wishlist.wishes} variant="table" />
      </Link>

      {/* Заголовок и счетчик желаний */}
      <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
        <div className="flex flex-col gap-1 lg:basis-2xs">
          <div className="flex items-center gap-1 pr-1 text-base">
            <span className="truncate">{wishlist.title}</span>
            {wishlist.isPrivate && (
              <Badge className="bg-transparent mt-1 text-foreground">
                <Lock className="size-3" />
              </Badge>
            )}
          </div>
          <span className="text-muted-foreground text-xs md:text-sm">
            {wishlist.wishes?.length ?? 0} жел.
          </span>
        </div>
      </Link>

      {/* Владелец / соавторы */}
      {showWishlistOwner ? (
        <div className="hidden sm:block justify-self-center md:justify-self-start">
          <OwnerAvatar
            userId={wishlist.ownerId}
            userName={wishlist.owner.userName}
            avatarURL={wishlist.owner.avatarURL}
          />
        </div>
      ) : (
        <div className="hidden sm:flex justify-self-center">
          {collaborators && (
            <CollaboratorsAvatars
              collaborators={collaborators}
              size={7}
              maxVisible={5}
              className="mt-1"
              hideOwner
            />
          )}
        </div>
      )}

      {/* Даты */}
      <div className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground text-xs xl:text-sm">
        <span className="bg-muted px-1 py-0.5 rounded-lg">создан</span>
        <span>{createdAt}</span>
      </div>
      <div className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground text-xs xl:text-sm">
        <span className="bg-muted px-1 py-0.5 rounded-lg">изменён</span>
        <span>{updatedAt}</span>
      </div>

      {/* Кнопки */}
      <div className="flex justify-end items-center md:gap-4">
        {(isOwner || isEditor) && (
          <EditWishlistButton onClick={onEditClick} variant="table" />
        )}
        <BookmarkButton
          variant="table"
          isFavorite={isFavorite || pathname === "/bookmarks"}
        />
      </div>
    </div>
  );
});

export default WishlistTableItem;
