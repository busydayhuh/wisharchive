import { useContext } from "react";
import { DashboardContext } from "./Context";

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside DashboardLayout");
  }
  return ctx;
}
