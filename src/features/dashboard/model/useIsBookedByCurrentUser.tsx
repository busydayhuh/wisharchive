import { useUser } from "@/features/auth";
import type { UserDocumentType } from "@/shared/model/types";

function useIsBookedByCurrentUser(bookedBy: UserDocumentType) {
  const { current } = useUser();

  if (!bookedBy) return false;

  return bookedBy.userId === current!.$id;
}

export default useIsBookedByCurrentUser;
