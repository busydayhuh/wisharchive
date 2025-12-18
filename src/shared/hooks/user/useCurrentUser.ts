// eslint-disable-next-line boundaries/element-types
import { useAuth } from "@/features/auth";
import { useUser } from "./useUser";

// Возвращает документ с информацией об авторизованном юзере

export function useCurrentUser() {
  const { current } = useAuth();
  const { user, isLoading, error, mutate: mutateUser } = useUser(current?.$id);

  return { user, isLoading, error, mutateUser };
}
