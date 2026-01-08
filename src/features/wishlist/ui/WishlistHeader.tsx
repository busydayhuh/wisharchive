import type { Roles } from "@/features/collaborators/model";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import type { WishlistDocumentType } from "@/shared/types";
import ShareOnSocials from "@/shared/ui/components/ShareOnSocials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/kit/accordion";
import { cn } from "@/shared/utils/css";
import { Eye, EyeClosed } from "lucide-react";
import { useWishlistBase } from "../model/hooks/useWishlistBase";
import { useWishlistDialog } from "../model/store/wishlist-dialog/useWishlistDialog";
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
  const openWishlistEditor = () =>
    openDialog("edit", wishlist, userRoles, collaborators);

  if (isMobile)
    return (
      <div className="space-y-4 mb-2">
        <WishlistName title={title} isPrivate={isPrivate} isMobile={isMobile} />

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
        <WishlistName title={title} isPrivate={isPrivate} isMobile={isMobile} />

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
  isMobile,
}: {
  title: string;
  isPrivate: boolean;
  isMobile: boolean;
}) {
  const privateText = isMobile ? <EyeClosed /> : "приватный";
  const publicText = isMobile ? <Eye /> : "открытый";

  return (
    <div className="flex items-center gap-3 lg:gap-5">
      <p className="font-headers font-bold text-2xl lg:text-3xl 2xl:text-4xl line-clamp-2 lg:line-clamp-none">
        {title}
      </p>
      <p
        className={cn(
          "inline-flex justify-center items-center px-1 md:px-2 py-1 rounded-full md:rounded-sm w-6 md:w-auto h-6 [&_svg]:size-3 text-xs",
          isPrivate ? "bg-pink-bg text-pink-950" : "bg-blue-bg text-blue"
        )}
      >
        {isPrivate ? privateText : publicText}
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
