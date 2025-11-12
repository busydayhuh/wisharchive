import { cn } from "@/shared/lib/css";
import React from "react";

export function DashboardGrid({
  viewMode,
  children,
  className,
}: {
  viewMode: "gallery" | "table";
  children: React.ReactNode;
  className?: string;
}) {
  if (viewMode === "gallery")
    return (
      <div
        className={cn(
          "gap-4 grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4",
          className
        )}
      >
        {children}
      </div>
    );

  if (viewMode === "table")
    return (
      <div className={cn("flex flex-col gap-1 md:gap-2 -mt-2")}>{children}</div>
    );
}
