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
  children,
}: {
  dashboardType: DashboardType;
  children: ReactNode;
}) {
  const [toolbarState, setToolbarState] = useLocalStorage<ToolbarState>(
    dashboardType,
    {
      sort: {
        direction: "desc",
        field: "$sequence",
      },
      filters: [],
      viewMode: "gallery",
    }
  );
  console.log(
    "🚀 ~ DashboardToolbarProvider ~ toolbarState, dashboardType",
    toolbarState,
    dashboardType
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
      }}
    >
      {children}
    </DashboardToolbarContext.Provider>
  );
}
