import { useLocalStorage } from "@/shared/lib/react/useLocalStorage";
import { useState, type ReactNode } from "react";
import type { DashboardType, Filter, Sort } from "./toolbarConfig";
import { DashboardToolbarContext } from "./useDashboardToolbar";

export type SortState = Pick<Sort, "field" | "direction">;

export type ToolbarState = {
  sort: SortState;
  filters: Filter[] | [];
  viewMode: "gallery" | "table";
};

export function DashboardToolbarProvider({
  dashboardType,
  localStorageKey,
  children,
}: {
  dashboardType: DashboardType;
  localStorageKey: string;
  children: ReactNode;
}) {
  const [toolbarState, setToolbarState] = useLocalStorage<ToolbarState>(
    localStorageKey,
    {
      sort: {
        direction: "desc",
        field: "$sequence",
      },
      filters: [],
      viewMode: "gallery",
    }
  );

  const [searchString, setSearchString] = useState("");

  return (
    <DashboardToolbarContext.Provider
      value={{
        toolbarState,
        setToolbarState,
        searchString,
        setSearchString,
        dashboardType,
        localStorageKey,
        hasActiveFilters: toolbarState.filters.length > 0,
      }}
    >
      {children}
    </DashboardToolbarContext.Provider>
  );
}
