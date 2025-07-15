import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { cn } from "../lib/css";

function MainContainer({ children }: { children: ReactNode }) {
  const location = useLocation().pathname;
  const isOutside =
    location === "/" || location === "/login" || location === "/signup";

  return (
    <main
      className={cn(
        "px-1 md:px-4 md:pr-5 lg:pr-[4.25rem] pb-4 lg:pl-6 w-full min-w-0",
        isOutside && "px-0 py-0"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
