import { type ReactNode } from "react";
import { Star } from "./Star";

function StarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative pt-4 md:pt-6 md:pr-8 border-foreground border-t-1 md:border-r-1 min-h-svh">
      <div className="hidden -top-6 -right-6 absolute place-content-center md:grid bg-transparent w-12 h-12">
        <Star />
      </div>
      {children}
    </div>
  );
}

export default StarFrame;
