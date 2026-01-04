import { useAuth } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { useNavigate } from "react-router-dom";

export function useProtectedAction() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (action: () => void) => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
      return;
    }
    action();
  };
}
