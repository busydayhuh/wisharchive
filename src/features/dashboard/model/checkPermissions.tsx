import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";

export function checkPermissions(
  userId: string,
  document: WishDocumentType | WishlistDocumentType
) {
  return {
    isOwner: userId === document.ownerId,
    isReader: document.$permissions.includes(`read("user:${userId}")`),
    isEditor: document.$permissions.includes(`update("user:${userId}")`),
    isBooker: document.bookerId ? document.bookerId === userId : false,
    isFavorite: document.bookmarkedBy
      ? document.bookmarkedBy.includes(userId)
      : false,
  };
}
