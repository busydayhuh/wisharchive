import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RouteContext } from "./createRouteContext";

export function RouteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const params = useParams();

  const value = useMemo(() => ({ location, params }), [location, params]);

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}
