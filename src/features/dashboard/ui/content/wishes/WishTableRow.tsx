import {
  useWishcardMeta,
  type WishcardMeta,
} from "@/features/dashboard/model/hooks/useWishcardMeta";
import { BookButton, FormattedPrice, WishImage } from "@/features/wish";
import { WishlistControls } from "@/features/wishlist-controls";
import "@/shared/assets/custom.css";
import { cn } from "@/shared/lib/css";
import type { WishDocumentType } from "@/shared/model/types";
import { PriorityBadge, PRIVACY_ICONS, ShopBadge } from "@/shared/ui/Badges";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { Link } from "react-router";
import { QuickActions } from "./QuickActions";

type RowProps = {
  wish: WishDocumentType;
  meta: WishcardMeta;
};

function WishTableRow({ wish }: { wish: WishDocumentType }) {
  const meta = useWishcardMeta(wish);
  return (
    <div
      className={cn(
        "wish-table-grid relative items-center md:px-1 py-1 md:py-2 w-full transition"
      )}
    >
      <WishRowImage wish={wish} meta={meta} />
      <WishRowTitle wish={wish} meta={meta} />
      <WishRowPriority priority={wish.priority} />
      <WishRowAdditionalInfo wish={wish} meta={meta} />
      <WishRowControls wish={wish} meta={meta} />
      <WishRowActions wish={wish} meta={meta} />
    </div>
  );
}

function WishRowImage({ wish, meta }: RowProps) {
  const { linkParams, isMobile } = meta;

  return (
    <Link
      to={linkParams.to}
      state={linkParams.state}
      className="group-card-wrapper flex items-center"
      style={{ gridArea: "image" }}
    >
      <div className="relative">
        <WishImage
          wishId={wish.$id}
          url={wish.imageURL}
          alt={wish.title}
          isBooked={wish.isBooked}
          variant="table"
        />
        {isMobile && wish.wishlist?.isPrivate && (
          <div className="top-2 left-2 absolute flex justify-center items-center rounded-full w-6 h-6 overflow-hidden">
            {PRIVACY_ICONS.private}
          </div>
        )}
      </div>
    </Link>
  );
}

function WishRowTitle({ wish, meta }: RowProps) {
  const { title, price, currency } = wish;
  const { linkParams } = meta;

  return (
    <Link
      to={linkParams.to}
      state={linkParams.state}
      style={{ gridArea: "title" }}
    >
      <div className="flex flex-col gap-1 px-4 lg:px-8">
        <p className="max-w-[40ch] font-semibold text-sm md:text-base line-clamp-2">
          {title}
        </p>

        {!!price && (
          <FormattedPrice
            price={price}
            currency={currency}
            className="text-muted-foreground text-sm lg:text-base"
          />
        )}
      </div>
    </Link>
  );
}

function WishRowPriority({ priority }: { priority: "0" | "1" | "2" }) {
  return (
    <div style={{ gridArea: "priority" }}>
      <PriorityBadge
        priority={priority}
        size="md"
        className="hidden md:inline-flex justify-self-center 2xl:text-sm"
      />
    </div>
  );
}

function WishRowAdditionalInfo({ wish, meta }: RowProps) {
  const { showOwner } = meta;
  return (
    <div
      className="hidden lg:flex justify-center"
      style={{ gridArea: "additional" }}
    >
      {showOwner ? (
        <OwnerAvatar
          userId={wish.ownerId}
          userName={wish.owner.userName}
          avatarURL={wish.owner.avatarURL}
        />
      ) : (
        wish.shopURL && <ShopBadge shopURL={wish.shopURL} />
      )}
    </div>
  );
}

function WishRowControls({ wish, meta }: RowProps) {
  const { userRoles } = meta;
  return (
    <div
      className="hidden md:block justify-self-end md:justify-self-center"
      style={{ gridArea: "controls" }}
    >
      <WishlistControls
        wish={wish}
        roles={userRoles}
        className="w-fit h-9 font-medium text-xs lg:text-sm"
        wishlist={wish.wishlist}
        variant="table"
      />
    </div>
  );
}

function WishRowActions({ wish, meta }: RowProps) {
  const { userRoles, onListPage, onEditWish } = meta;
  const { isWishOwner, isEditor, isBooker } = userRoles;
  return (
    <div
      className="justify-self-end lg:justify-self-center"
      style={{ gridArea: "actions" }}
    >
      {onListPage && (isWishOwner || isEditor) ? (
        <WishlistControls
          wish={wish}
          wishlist={wish.wishlist}
          roles={userRoles}
          variant="table"
          className="w-fit h-9 font-medium text-xs lg:text-sm"
        />
      ) : isWishOwner ? (
        <QuickActions
          imageURL={wish.imageURL ?? undefined}
          wishId={wish.$id}
          title={wish.title}
          triggerVariant="table"
          side="bottom"
          align="end"
          isArchived={wish.isArchived}
          onEditWish={onEditWish}
        />
      ) : (
        <BookButton
          wishId={wish.$id}
          wishTitle={wish.title}
          imageURL={wish.imageURL ?? undefined}
          isBooked={wish.isBooked}
          isBookedByCurrentUser={isBooker ?? false}
          triggerVariant="table"
        />
      )}
    </div>
  );
}

export default WishTableRow;
