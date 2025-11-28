import type { Roles } from "@/features/collaborators";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/kit/accordion";
import ShareOnSocials from "@/shared/ui/ShareOnSocials";
import { BookmarkButton } from "./actions/BookmarkButton";
import { EditWishlistButton } from "./actions/EditWishlistButton";
import { Collaborators } from "./Collaborators";

export function WishlistHeader({
  wishlistId,
  ownerId,
  title,
  isPrivate,
  description,
  bookmarkWishlist,
  userRoles,
  isFavorite,
  openWishlistEditor,
  editors,
  readers,
}: {
  wishlistId: string;
  ownerId: string;
  title: string;
  isPrivate: boolean;
  description?: string | null;
  bookmarkWishlist: (pressed: boolean) => Promise<void>;
  userRoles: Roles | undefined;
  isFavorite: boolean;
  openWishlistEditor: () => void;
  editors: string[];
  readers: string[];
}) {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className="space-y-3 mt-3 mb-1">
        <div className="flex justify-between items-center gap-2">
          <WishlistName title={title} isPrivate={isPrivate} />
        </div>

        <div className="flex justify-between items-center">
          <Collaborators
            ownerId={ownerId}
            wishlistId={wishlistId}
            isPrivate={isPrivate}
            editors={editors}
            readers={readers}
            isOwner={userRoles?.isWishlistOwner ?? false}
          />

          <div className="flex items-center gap-1.5">
            {(userRoles?.isEditor || userRoles?.isWishlistOwner) && (
              <EditWishlistButton onClick={openWishlistEditor} variant="page" />
            )}
            <ShareOnSocials />
            <BookmarkButton
              variant="gallery"
              isFavorite={isFavorite}
              onPressed={bookmarkWishlist}
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
          {(userRoles?.isEditor || userRoles?.isWishlistOwner) && (
            <EditWishlistButton onClick={openWishlistEditor} variant="page" />
          )}
          <ShareOnSocials />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Collaborators
          ownerId={ownerId}
          wishlistId={wishlistId}
          isPrivate={isPrivate}
          editors={editors}
          readers={readers}
          isOwner={userRoles?.isWishlistOwner ?? false}
        />
        <BookmarkButton
          variant="page"
          isFavorite={isFavorite}
          onPressed={bookmarkWishlist}
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
      <p className="font-bold text-xl lg:text-3xl 2xl:text-4xl line-clamp-2 lg:line-clamp-none leading-6 lg:leading-8">
        {title}
      </p>
      <p
        className={cn(
          "inline-flex px-2 py-1 rounded-sm text-xs",
          isPrivate ? "bg-pink-bg" : "bg-blue-bg"
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
