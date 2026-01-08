import { useContext } from "react";
import { RouteContext } from "../../../shared/store/route/RouteContext";

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx)
    throw Error(
      "RouteContext должен использоваться внутри RouteContextProvider"
    );

  return ctx;
}
