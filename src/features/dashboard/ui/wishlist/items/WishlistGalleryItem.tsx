import { useAuth } from "@/features/auth";
import {
  EditWishlistButton,
  useWishlistDialog,
  useWishlistRoles,
} from "@/features/list";

import { CollaboratorsAvatars } from "@/features/collaborators";
import { useCollaborators } from "@/features/collaborators/";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { WishlistDocumentType } from "@/shared/model/types";
import { Badge } from "@/shared/ui/kit/badge";
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
  const { collaborators } = useCollaborators(wishlist.$id);

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
          <div className="flex justify-between items-center mt-1 px-2">
            {/* Название */}
            <div className="flex items-center gap-1 pr-2 text-base md:text-lg">
              {wishlist.isPrivate && (
                <Badge
                  className="mt-1 px-0 text-muted-foreground"
                  variant="outline"
                >
                  <Lock />
                </Badge>
              )}
              <span className="max-w-[20ch] truncate leading-tight">
                {wishlist.title}
              </span>
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

        <div className={cn("flex justify-between items-end px-2")}>
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
