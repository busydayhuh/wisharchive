import { useUser } from "@/features/auth";
import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";

function usePermissions(document: WishDocumentType | WishlistDocumentType) {
  const { current } = useUser();

  return {
    isOwner: current?.$id === document.ownerId,
    isReader: document.$permissions.includes(`read("user:${current?.$id}")`),
    isEditor: document.$permissions.includes(`update("user:${current?.$id}")`),
    isBooker: document.bookerId ? document.bookerId === current?.$id : false,
    isFavorite: document.bookmarkedBy
      ? document.bookmarkedBy.includes(current?.$id)
      : false,
  };
}

export default usePermissions;
