import { createContext, useContext } from "react";
import type { Location, Params } from "react-router";

export type RouteContext = {
  location: Location;
  params: Params;
};

export const RouteContext = createContext<RouteContext | null>(null);

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx)
    throw Error(
      "RouteContext должен использоваться внутри RouteContextProvider"
    );

  return ctx;
}
