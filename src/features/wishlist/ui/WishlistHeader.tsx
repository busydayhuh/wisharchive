import type { Roles } from "@/features/collaborators";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import type { WishDocumentType } from "@/shared/model/types";
import ExpandableText from "@/shared/ui/ExpandableText";
import { BookmarkButton } from "./BookmarkButton";
import { EditWishlistButton } from "./EditWishlistButton";
import { WishlistCollaborators } from "./WishlistCollaborators";

export function WishlistHeader({
  wishlistId,
  title,
  wishes,
  isPrivate,
  description,
  bookmarkWishlist,
  userRoles,
  isFavorite,
  openWishlistEditor,
}: {
  wishlistId: string;
  title: string;
  wishes: WishDocumentType[] | null;
  isPrivate: boolean;
  description?: string | null;
  bookmarkWishlist: (pressed: boolean) => Promise<void>;
  userRoles: Roles | undefined;
  isFavorite: boolean;
  openWishlistEditor: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-baseline gap-2">
          <WishlistName
            title={title}
            isPrivate={isPrivate}
            wishesCount={wishes ? wishes.length : 0}
          />
          {(userRoles?.isEditor || userRoles?.isWishlistOwner) && (
            <EditWishlistButton onClick={openWishlistEditor} variant="page" />
          )}
        </div>
        <div className="flex justify-between items-center">
          <WishlistCollaborators
            wishlistId={wishlistId}
            isPrivate={isPrivate}
          />
          <BookmarkButton
            variant="page"
            isFavorite={isFavorite}
            onPressed={bookmarkWishlist}
          />
        </div>

        {description && (
          <ExpandableText
            text={description}
            className="text-xs"
            lines={3}
            buttonTextSize="text-xs"
          />
        )}
      </div>
    );

  return (
    <div className="space-y-4 lg:space-y-6 lg:mb-3 pr-6">
      <div className="flex justify-between items-start gap-4 lg:gap-2">
        <div className="flex items-baseline gap-4">
          <WishlistName
            title={title}
            isPrivate={isPrivate}
            wishesCount={wishes ? wishes.length : 0}
          />
          {(userRoles?.isEditor || userRoles?.isWishlistOwner) && (
            <EditWishlistButton onClick={openWishlistEditor} variant="page" />
          )}
        </div>
        <WishlistCollaborators wishlistId={wishlistId} isPrivate={isPrivate} />
      </div>
      <div className="flex justify-between items-start gap-2">
        {description && (
          <ExpandableText
            text={description}
            className="max-w-[70%] text-xs lg:text-sm"
            lines={3}
            buttonTextSize="text-xs lg:text-sm"
          />
        )}

        <BookmarkButton
          variant="page"
          isFavorite={isFavorite}
          onPressed={bookmarkWishlist}
          className="ms-auto"
        />
      </div>
    </div>
  );
}

export function WishlistName({
  title,
  wishesCount,
  isPrivate,
}: {
  title: string;
  wishesCount: number;
  isPrivate: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-2xl lg:text-3xl 2xl:text-4xl leading-6 lg:leading-8">
        {title}
      </p>
      <p className="inline-flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
        <span>{wishesCount} жел.</span>
        <span>|</span>
        <span className="flex items-center gap-2">
          {isPrivate ? "приватный" : "публичный"}
        </span>
      </p>
    </div>
  );
}
