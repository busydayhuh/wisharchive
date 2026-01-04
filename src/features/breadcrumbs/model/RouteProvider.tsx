import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RouteContext, type NavigateWithState } from "./RouteContext";

export function RouteContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const navigateWithState: NavigateWithState = useCallback(
    (path, stateData) => {
      navigate(path, {
        state: {
          prevLocation: location.pathname,
          prevParams: params,
          data: stateData,
        },
      });
    },
    [navigate, location, params]
  );

  const value = useMemo(
    () => ({ location, params, navigateWithState }),
    [location, params, navigateWithState]
  );

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}
