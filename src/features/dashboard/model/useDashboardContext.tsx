import { createContext, useContext } from "react";
import type { DashboardMeta } from "./useDashboardMeta";

export const DashboardContext = createContext<DashboardMeta | null>(null);

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardContext must be used inside DashboardLayout");
  }
  return ctx;
}
