import { type ReactNode } from "react";
import { Star } from "./Star";

function StarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative pt-8 md:pr-8 border-foreground border-t-1 md:border-r-1">
      <div className="-top-6 -right-6 absolute place-content-center grid bg-transparent w-12 h-12">
        <Star />
      </div>
      {children}
    </div>
  );
}

export default StarFrame;
