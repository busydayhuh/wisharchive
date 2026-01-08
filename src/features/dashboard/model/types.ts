import type { Action } from "@/shared/types";
import type { Dispatch, JSX, SetStateAction } from "react";

export type DashboardType =
  | "wishes"
  | "lists"
  | "booked"
  | "bookmarks"
  | "shared"
  | "archived"
  | "list";

export type Sort = {
  label: string;
  field: string;
  direction: "asc" | "desc";
  default?: boolean;
  icon?: React.ReactNode;
};
export type Filter = {
  key: string;
  value?: string | boolean | number | null;
  requiresUser?: boolean;
  label: string;
  onlyIfOwner?: boolean;
};

export type ToolbarConfig = {
  sorts: Sort[];
  filters: Filter[];
};

export type SortState = Pick<Sort, "field" | "direction">;

export type ToolbarState = {
  sort: SortState;
  filters: Filter[] | [];
  viewMode: "gallery" | "table";
};

export type ToolbarContext = {
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
  toolbarState: ToolbarState;
  hasActiveFilters: boolean;
  setToolbarState: Dispatch<SetStateAction<ToolbarState>>;
  dashboardType: DashboardType;
  localStorageKey: string;
};

export type MenuItem = {
  title: string;
  icon: JSX.Element;
  action: () => void;
  actionName: Action;
  isActive?: boolean;
  confirmation?: boolean;
};
