import { useContext } from "react";
import { ToolbarContext } from "./Context";

export function useToolbar() {
  const ctx = useContext(ToolbarContext);

  if (!ctx)
    throw new Error(
      "useToolbar должен использоваться только внутри DashboardToolbarContext"
    );

  return ctx;
}
