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
import { memo } from "react";
import { href, Link, useLocation } from "react-router";
import { BookmarkButton } from "../actions/BookmarkButton";

import { useAuth } from "@/features/auth";
import { CollaboratorsAvatars } from "@/features/collaborators";
import { useCollaborators } from "@/features/collaborators/";
import ImageTiles from "./ImageTiles";

const WishlistTableItem = memo(function WishlistTableItem({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const { pathname } = useLocation();
  const { current: authUser } = useAuth();
  const { collaborators } = useCollaborators(wishlist.$id);

  const dialogContext = useWishlistDialog();

  const { isOwner, isFavorite, isEditor } = useWishlistRoles(
    authUser?.$id ?? "",
    wishlist.$id
  );

  function onEditClick() {
    dialogContext.openDialog("edit", wishlist.$id);
  }

  return (
    <>
      <div className="relative items-center gap-3 md:gap-4 lg:gap-6 grid grid-cols-[5rem_10rem_1fr_1fr] md:grid-cols-[5rem_2fr_1fr_1fr] lg:grid-cols-[fit-content(128px)_2fr_1fr_1fr_1fr_1fr_1fr] pt-2 pb-4 md:pb-2 lg:pb-0 pl-2 md:pl-3 transition dot-on-hover">
        {/* Коллаж картинок */}
        <Link to={href(ROUTES.WISHLIST, { listId: wishlist.$id })}>
          <ImageTiles wishes={wishlist.wishes} variant="table" />
        </Link>

        {/* Заголовок */}
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

            {/* Счетчик желаний */}
            <span className="text-xs md:text-sm">{`${
              wishlist.wishes ? wishlist.wishes.length : 0
            } жел.`}</span>

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

        <div className="justify-self-center md:justify-self-start">
          {(pathname === "/bookmarks" || pathname === "/shared") && (
            <OwnerAvatar
              userId={wishlist.ownerId}
              userName={wishlist.owner.userName}
              avatarURL={wishlist.owner.avatarURL}
            />
          )}
        </div>
        <div className="hidden lg:flex justify-self-center md:justify-self-start">
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
        <div className="hidden lg:block w-fit text-sm">
          создан: {format(wishlist.$createdAt, "PPp", { locale: ru })}
        </div>
        <div className="hidden lg:block w-fit text-sm">
          изменен: {format(wishlist.$updatedAt, "PPp", { locale: ru })}
        </div>

        <div className="flex justify-end lg:justify-around align-middle">
          {(isOwner || isEditor) && (
            <EditWishlistButton onClick={onEditClick} variant="table" />
          )}

          <BookmarkButton
            variant="table"
            isFavorite={isFavorite || pathname === "/bookmarks"}
          />
        </div>
      </div>
    </>
  );
});

export default WishlistTableItem;
