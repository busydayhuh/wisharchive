import { useUser } from "@/features/auth";

function useIsBookedByCurrentUser(bookerId: string | null) {
  const { current } = useUser();

  if (!bookerId) return false;

  return bookerId === current!.$id;
}

export default useIsBookedByCurrentUser;
