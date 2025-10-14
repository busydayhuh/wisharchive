import { DashboardLayout, useWishlistcardMeta } from "@/features/dashboard";
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
    <DashboardLayout
      header={
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
      }
    >
      <WishlistContent wishlistId={wishlist.$id} />
    </DashboardLayout>
  );
}
