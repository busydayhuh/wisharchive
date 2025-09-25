import { useWishcardMeta } from "@/features/dashboard";
import type { WishDocumentType } from "@/shared/model/types";
import { memo } from "react";
import { useWishQuickActions } from "../../model/useWishQuickActions";
import { WishDetails } from "./WishDetails";
import { WishFooter } from "./WishFooter";
import { WishHeader } from "./WishHeader";

export const WishInfo = memo(function WishInfo({
  wish,
}: {
  wish: WishDocumentType;
}) {
  const { isEditor, isOwner, isBooker } = useWishcardMeta(wish);
  const { archiveWish, bookWish, editWish } = useWishQuickActions(wish.$id);

  return (
    <div className="flex flex-col gap-6 lg:gap-10 2xl:gap-12 px-2 md:px-0 py-2.5">
      <WishHeader
        title={wish.title}
        owner={wish.owner}
        isEditor={isEditor}
        editWish={editWish}
      />

      <WishDetails
        wishlist={wish.wishlist}
        priority={wish.priority}
        description={wish.description}
        shopURL={wish.shopURL}
      />

      <WishFooter
        wishTitle={wish.title}
        isBooked={wish.isBooked}
        price={wish.price}
        currency={wish.currency}
        shopURL={wish.shopURL}
        isArchived={wish.isArchived}
        isBooker={isBooker}
        isOwner={isOwner}
        archiveWish={archiveWish}
        bookWish={bookWish}
      />
    </div>
  );
});
