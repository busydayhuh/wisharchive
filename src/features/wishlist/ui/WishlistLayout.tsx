import { DashboardToolbar, useWishlistcardMeta } from "@/features/dashboard";
import type { WishlistDocumentType } from "@/shared/model/types";
import { WishlistContent } from "./WishlistContent";
import { WishlistHeader } from "./WishlistHeader";

export function WishlistLayout({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const { userRoles, isFavorite, bookmarkWishlist, openWishlistEditor } =
    useWishlistcardMeta(wishlist);

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4 px-2 md:px-0">
        <WishlistHeader
          wishlistId={wishlist.$id}
          title={wishlist.title}
          wishes={wishlist.wishes}
          isPrivate={wishlist.isPrivate}
          description={wishlist.description}
          bookmarkWishlist={bookmarkWishlist}
          isFavorite={isFavorite}
          userRoles={userRoles}
          openWishlistEditor={openWishlistEditor}
        />
        <DashboardToolbar isOwner={false} />
      </div>
      <WishlistContent wishlistId={wishlist.$id} />
    </>
  );
}
