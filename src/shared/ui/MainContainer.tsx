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
        "pr-2 lg:pr-[4.25rem] pb-4 pl-2 lg:pl-6 min-w-0",
        isOutside && "px-0 py-0"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
