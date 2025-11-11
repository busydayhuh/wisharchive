import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ToolbarState } from "./DashboardToolbarContext";
import type { DashboardType } from "./toolbarConfig";

export type DashboardToolbarContext = {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  toolbarState: ToolbarState;
  hasActiveFilters: boolean;
  setToolbarState: Dispatch<SetStateAction<ToolbarState>>;
  dashboardType: DashboardType;
  localStorageKey: string;
};

export const DashboardToolbarContext =
  createContext<DashboardToolbarContext | null>(null);

export function useDashboardToolbar() {
  const ctx = useContext(DashboardToolbarContext);

  if (!ctx)
    throw new Error(
      "useDashboardToolbar должен использоваться только внутри DashboardToolbarContext"
    );

  return ctx;
}
