import { CollaboratorsGroup } from "@/features/collaborators";
import {
  useWishlistcardMeta,
  type WishlistcardMeta,
} from "@/features/dashboard/model/hooks/useWishlistcardMeta";
import { BookmarkButton, EditWishlistButton } from "@/features/wishlist";
import "@/shared/assets/custom.css";
import type { WishlistDocumentType } from "@/shared/types";
import { PRIVACY_ICONS, RoleBadge } from "@/shared/ui/components/Badges";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useMemo } from "react";
import { Link } from "react-router";
import { WishlistTiles } from "./WishlistTiles";

type WishlistRowProps = {
  wishlist: WishlistDocumentType;
  meta: WishlistcardMeta;
};

function WishlistTableRow({ wishlist }: { wishlist: WishlistDocumentType }) {
  const meta = useWishlistcardMeta(wishlist);

  return (
    <div className="wl-table-grid relative items-center py-2 pl-2 lg:pl-0">
      <WishlistRowImage wishlist={wishlist} meta={meta} />
      <WishlistRowTitle wishlist={wishlist} meta={meta} />
      <WishlistRowCollaborators meta={meta} />
      <WishlistRowDates wishlist={wishlist} />
      <WishlistRowActions meta={meta} />
    </div>
  );
}

function WishlistRowImage({ wishlist, meta }: WishlistRowProps) {
  const { linkParams } = meta;
  return (
    <Link {...linkParams} className="relative" style={{ gridArea: "image" }}>
      <WishlistTiles wishes={wishlist.wishes} variant="table" />
      {wishlist.isPrivate && (
        <div className="top-4 left-0 absolute flex justify-center items-center bg-pink-bg rounded-full w-6 md:w-8 h-6 md:h-8 overflow-clip">
          {PRIVACY_ICONS.private}
        </div>
      )}
    </Link>
  );
}

function WishlistRowTitle({ wishlist, meta }: WishlistRowProps) {
  const { linkParams, onSharedPage, userRoles } = meta;
  return (
    <Link {...linkParams} style={{ gridArea: "title" }}>
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
  );
}

function WishlistRowCollaborators({ meta }: { meta: WishlistcardMeta }) {
  const { collaborators } = meta;
  return (
    <div
      className="hidden sm:flex justify-self-center"
      style={{ gridArea: "collab" }}
    >
      {collaborators && (
        <CollaboratorsGroup
          collaborators={collaborators}
          size="md"
          maxVisible={5}
          className="mt-1"
          hideOwner
        />
      )}
    </div>
  );
}

function WishlistRowDates({ wishlist }: { wishlist: WishlistDocumentType }) {
  const createdAt = useMemo(
    () => format(wishlist.$createdAt, "PP", { locale: ru }),
    [wishlist.$createdAt]
  );

  const updatedAt = useMemo(
    () => format(wishlist.$updatedAt, "PP", { locale: ru }),
    [wishlist.$updatedAt]
  );
  return (
    <>
      <div
        className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground"
        style={{ gridArea: "created" }}
      >
        <p className="bg-muted px-1.5 py-0.5 rounded-lg text-xs">создан</p>
        <p className="text-sm">{createdAt}</p>
      </div>
      <div
        className="hidden lg:flex flex-col items-center gap-0.5 text-muted-foreground"
        style={{ gridArea: "updated" }}
      >
        <p className="bg-muted px-1.5 py-0.5 rounded-lg text-xs">изменён</p>
        <p className="text-sm">{updatedAt}</p>
      </div>
    </>
  );
}

function WishlistRowActions({ meta }: { meta: WishlistcardMeta }) {
  const { userRoles, openWishlistEditor, isFavorite, toggleBookmark } = meta;
  return (
    <div
      className="flex justify-end md:justify-evenly items-center"
      style={{ gridArea: "actions" }}
    >
      {(userRoles?.isWishlistOwner || userRoles?.isEditor) && (
        <EditWishlistButton
          onClick={openWishlistEditor}
          className="hidden md:inline-flex"
        />
      )}
      <BookmarkButton
        variant="table"
        isFavorite={isFavorite}
        onPressed={toggleBookmark}
      />
    </div>
  );
}

export default WishlistTableRow;
