import type { LinkParams } from "@/shared/types";
import { createContext } from "react";
import type { Location, Params } from "react-router-dom";

export type RouteContext = {
  location: Location;
  params: Params;
  navigateWithState: NavigateWithState;
};

export type NavigateWithState = (
  route: string,
  stateData?: LinkParams["state"]["data"]
) => void;

export const RouteContext = createContext<RouteContext | null>(null);
