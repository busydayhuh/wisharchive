import { useUser } from "@/features/auth";
import type {
  UserDocumentType,
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";

function usePermissions(document: WishDocumentType | WishlistDocumentType) {
  const { current } = useUser();

  return {
    isOwner: current!.$id === document.ownerId,
    isReader: document.$permissions.includes(`read("user:${current!.$id}")`),
    isEditor: document.$permissions.includes(`update("user:${current!.$id}")`),
    isBooker: document.bookerId ? document.bookerId === current!.$id : false,
    isFavorite: document.favoredBy
      ? document.favoredBy.some(
          (user: UserDocumentType) => user.userId === current!.$id
        )
      : false,
  };
}

export default usePermissions;
