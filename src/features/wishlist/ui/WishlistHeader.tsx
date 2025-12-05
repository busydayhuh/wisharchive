import type { Roles } from "@/features/collaborators";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { WishlistDocumentType } from "@/shared/model/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/kit/accordion";
import ShareOnSocials from "@/shared/ui/ShareOnSocials";
import { useWishlistBase } from "../model/useWishlistBase";
import { useWishlistDialog } from "../model/useWishlistDialog";
import { BookmarkButton } from "./actions/BookmarkButton";
import { EditWishlistButton } from "./actions/EditWishlistButton";
import { Collaborators } from "./Collaborators";

export function WishlistHeader({
  wishlist,
  userRoles,
}: {
  wishlist: WishlistDocumentType;
  userRoles: Roles | undefined;
}) {
  const isMobile = useIsMobile();
  const { title, $id, isPrivate, description } = wishlist;
  const {
    isFavorite,
    toggleBookmark,
    collaborators,
    collabsError,
    collabsLoading,
  } = useWishlistBase(wishlist);
  const canEdit = userRoles?.isEditor || userRoles?.isWishlistOwner;

  const { openDialog } = useWishlistDialog();
  const openWishlistEditor = () => openDialog("edit", wishlist, userRoles);

  if (isMobile)
    return (
      <div className="space-y-4 mb-2">
        <WishlistName title={title} isPrivate={isPrivate} />

        <div className="flex justify-between items-center">
          <Collaborators
            collaborators={collaborators}
            isLoading={collabsLoading}
            error={collabsError}
            wishlistId={$id}
            isPrivate={isPrivate}
            isOwner={userRoles?.isWishlistOwner ?? false}
          />

          <div className="flex items-center gap-1.5">
            {canEdit && (
              <EditWishlistButton onClick={openWishlistEditor} variant="page" />
            )}
            <ShareOnSocials />
            <BookmarkButton
              variant="gallery"
              isFavorite={isFavorite}
              onPressed={toggleBookmark}
            />
          </div>
        </div>

        {description && <HiddenDescription text={description} />}
      </div>
    );

  return (
    <div className="space-y-4 mt-2 mb-3 lg:mb-5">
      <div className="flex justify-between items-center gap-4">
        <WishlistName title={title} isPrivate={isPrivate} />

        <div className="flex items-center gap-2">
          {canEdit && (
            <EditWishlistButton onClick={openWishlistEditor} variant="page" />
          )}
          <ShareOnSocials />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Collaborators
          collaborators={collaborators}
          isLoading={collabsLoading}
          error={collabsError}
          wishlistId={$id}
          isPrivate={isPrivate}
          isOwner={userRoles?.isWishlistOwner ?? false}
        />
        <BookmarkButton
          variant="page"
          isFavorite={isFavorite}
          onPressed={toggleBookmark}
          className="ms-auto"
        />
      </div>

      {description && <HiddenDescription text={description} />}
    </div>
  );
}

export function WishlistName({
  title,
  isPrivate,
}: {
  title: string;
  isPrivate: boolean;
}) {
  return (
    <div className="flex items-center gap-3 lg:gap-5">
      <p className="font-headers font-bold text-2xl lg:text-3xl 2xl:text-4xl line-clamp-2 lg:line-clamp-none leading-6 lg:leading-8">
        {title}
      </p>
      <p
        className={cn(
          "inline-flex px-2 py-1 rounded-sm text-xs",
          isPrivate ? "bg-pink-bg text-pink-950" : "bg-blue-bg text-blue"
        )}
      >
        {isPrivate ? "приватный" : "публичный"}
      </p>
    </div>
  );
}

function HiddenDescription({ text }: { text: string }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Показать описание</AccordionTrigger>
        <AccordionContent>{text}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
