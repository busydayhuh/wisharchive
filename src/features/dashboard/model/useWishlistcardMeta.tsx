import { useAuth } from "@/features/auth";
import { useCollaborators } from "@/features/collaborators";
import {
  useBookmarkWishlist,
  useWishlistDialog,
  useWishlistPermissions,
} from "@/features/wishlist";
import type { WishlistDocumentType } from "@/shared/model/types";
import { useLocation } from "react-router";

export function useWishlistcardMeta(wishlist: WishlistDocumentType) {
  const { pathname } = useLocation();
  const { current: authUser } = useAuth();
  const { collaborators } = useCollaborators(wishlist.$id);

  const { openDialog } = useWishlistDialog();
  const { toggleBookmark } = useBookmarkWishlist(
    wishlist.$id,
    wishlist.bookmarkedBy ?? []
  );

  const { isOwner, isEditor } = useWishlistPermissions(
    authUser?.$id ?? "",
    wishlist.$id
  );
  const isFavorite =
    (!!authUser?.$id && wishlist.bookmarkedBy?.includes(authUser.$id)) ?? false;

  const onBookmarksPage = pathname.includes("/bookmarks");
  const onSharedPage = pathname.includes("/shared");

  function onEdit() {
    openDialog("edit", wishlist.$id);
  }

  return {
    collaborators,
    toggleBookmark,
    isOwner,
    isEditor,
    isFavorite,
    onBookmarksPage,
    onSharedPage,
    onEdit,
  };
}
