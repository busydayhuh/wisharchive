import { useUser } from "@/features/auth";
import type { UserDocumentType } from "@/shared/model/types";

function useIsFavored(isFavoriteBy: UserDocumentType[]) {
  const { current } = useUser();

  if (!isFavoriteBy || isFavoriteBy.length === 0) return false;

  return isFavoriteBy.some((fav) => fav.userId === current!.$id);
}

export default useIsFavored;
