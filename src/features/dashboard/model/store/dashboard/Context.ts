import { createContext } from "react";
import type { DashboardMeta } from "../../hooks/useDashboardMeta";

export const DashboardContext = createContext<DashboardMeta | null>(null);
