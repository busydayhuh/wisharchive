import { ID } from "appwrite";
import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../kit/tooltip";
import DataStatePropInterceptor from "./DataStatePropInterceptor";

export function IconBtnWithTooltip({
  children,
  tooltipText,
  tooltipSide = "top",
}: {
  children: ReactNode;
  tooltipText: string;
  tooltipSide?: "top" | "left" | "right" | "bottom";
}) {
  return (
    <Tooltip key={ID.unique()}>
      <TooltipTrigger asChild>
        <DataStatePropInterceptor>{children}</DataStatePropInterceptor>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide}>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
