import * as React from "react";

import { cn } from "@/shared/lib/css";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex bg-secondary dark:bg-input/30 disabled:opacity-50 shadow-0 px-3 py-2 border-0 aria-invalid:border-destructive focus-visible:border-ring rounded-md outline-0 aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 w-full min-h-16 placeholder:text-muted-foreground md:text-sm text-base transition-[color,box-shadow] field-sizing-content disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
