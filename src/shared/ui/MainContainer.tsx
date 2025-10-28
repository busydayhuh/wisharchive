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
        "relative mt-0 md:mt-2 lg:mt-4 px-1 lg:px-5 md:pb-4 md:pl-2 lg:pl-8 w-full",
        outside && "px-0 py-0",
        slimLayout && "mx-auto max-w-[100rem]"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
