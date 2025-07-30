import { type ReactNode } from "react";
import { Star } from "./Star";

function StarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative border-foreground border-t-1 md:border-r-1">
      <div className="hidden -top-6 -right-6 z-100 absolute place-content-center md:grid bg-transparent w-12 h-12">
        <Star />
      </div>
      {children}
    </div>
  );
}

export default StarFrame;
