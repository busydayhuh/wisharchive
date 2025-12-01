import { createContext } from "react";
import type { ToolbarContext as ToolbarContextT } from "../../types";

export const ToolbarContext = createContext<ToolbarContextT | null>(null);
