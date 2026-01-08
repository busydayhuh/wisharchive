import { ROUTES } from "@/shared/config/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";

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
