import type { LinkParams } from "@/shared/model/types";
import { createContext } from "react";
import type { Location, Params } from "react-router";

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
