import type { ReactNode } from "react";
import { cn } from "../lib/css";
import { useDepartment } from "../lib/react/useDepartment";

function MainContainer({
  children,
}: {
  children: ReactNode;
  slimLayout?: boolean;
  outside?: boolean;
}) {
  const { slimPage, outside } = useDepartment();

  return (
    <main
      className={cn(
        "relative mt-0 md:mt-2 lg:mt-4 lg:px-5 md:pb-4 md:pl-2 lg:pl-8 w-full",
        outside && "!p-0 !m-0",
        slimPage && "mx-auto max-w-[100rem]"
      )}
    >
      {children}
    </main>
  );
}

export default MainContainer;
