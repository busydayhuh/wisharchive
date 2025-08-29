import { Star } from "@/features/wish/ui/Star";
import type { ReactNode } from "react";

function StarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-4 mr-8 border-muted border-t-1 md:border-r-1">
      <div className="hidden -top-6 -right-6 z-100 absolute place-content-center md:grid bg-transparent w-12 h-12">
        <Star />
      </div>
      {children}
    </div>
  );
}

export default StarFrame;
