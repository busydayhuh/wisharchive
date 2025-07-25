import { useUser } from "@/features/auth";
import { useDashboardContext } from "@/features/dashboard";
import { ROUTES } from "@/shared/model/routes";
import { href, Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { current } = useUser();
  const context = useDashboardContext();

  if (!current) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet context={context} />;
}

export function UnauthOnlyRoute() {
  const { current } = useUser();

  if (current) {
    return <Navigate to={href(ROUTES.WISHES, { userId: current.$id })} />;
  }

  return <Outlet />;
}
