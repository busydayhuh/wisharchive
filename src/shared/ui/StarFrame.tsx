import { type ReactNode } from "react";
import { Star } from "./Star";

function StarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="border-t-1 md:border-r-1 border-foreground relative pt-2 md:pr-8">
      <div className="w-12 h-12 bg-transparent grid place-content-center absolute -top-6 -right-6">
        <Star />
      </div>
      {children}
    </div>
  );
}

export default StarFrame;
