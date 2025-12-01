import { useLocalStorage } from "@/shared/lib/react/useLocalStorage";
import { useState, type ReactNode } from "react";
import type { DashboardType, ToolbarState } from "../../types";
import { ToolbarContext } from "./Context";

export function ToolbarProvider({
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
    <ToolbarContext.Provider
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
    </ToolbarContext.Provider>
  );
}
