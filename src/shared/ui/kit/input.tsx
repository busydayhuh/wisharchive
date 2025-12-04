import * as React from "react";

import { cn } from "@/shared/lib/css";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:inline-flex flex bg-secondary selection:bg-primary dark:bg-input/30 file:bg-transparent disabled:opacity-50 shadow-none px-3 py-1 border-0 border-border/60 file:border-0 rounded-md outline-0 w-full min-w-0 h-12 file:h-7 file:font-medium selection:text-primary-foreground placeholder:text-muted-foreground/60 file:text-foreground md:text-sm file:text-sm text-base transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

export { Input };
