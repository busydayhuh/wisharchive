import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { cn } from "../lib/css";

function MainContainer({ children }: { children: ReactNode }) {
  const location = useLocation().pathname;
  const isOutside =
    location === "/" || location === "/login" || location === "/signup";

  return (
    <div
      className={cn(
        "px-1 pt-2 md:pr-[4.25rem] pb-4 md:pl-9 w-full",
        isOutside && "py-0"
      )}
    >
      {children}
    </div>
  );
}

export default MainContainer;
