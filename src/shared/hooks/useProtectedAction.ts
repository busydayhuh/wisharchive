/* eslint-disable boundaries/element-types */
import { useAuth } from "@/features/auth";
import { useNavigate } from "react-router";
import { ROUTES } from "../config/routes";

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
