import type { ReactNode } from "react";
import { cn } from "../lib/css";

function MainContainer({
  children,
  slimLayout = false,
  outside = false,
}: {
  children: ReactNode;
  slimLayout?: boolean;
  outside?: boolean;
}) {
  return (
    <main
      className={cn(
        "relative px-1 md:px-4 md:pr-5 md:pb-4 lg:pl-12 w-full min-w-0",
        outside && "px-0 py-0",
        slimLayout && "2xl:mx-auto max-w-[96rem]"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
