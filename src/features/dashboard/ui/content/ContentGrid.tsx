import { cn } from "@/shared/utils/css";
import React from "react";

export function ContentGrid({
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
      <div className={cn("gap-1 md:gap-2 grid grid-cols-1 -mt-2")}>
        {children}
      </div>
    );
}
