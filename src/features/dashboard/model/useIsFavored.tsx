import { useUser } from "@/features/auth";
import type { UserDocumentType } from "@/shared/model/types";

function useIsFavored(isFavoredBy: UserDocumentType[]) {
  const { current } = useUser();

  if (!isFavoredBy || isFavoredBy.length === 0) return false;

  return isFavoredBy.some((fav) => fav.userId === current!.$id);
}

export default useIsFavored;
