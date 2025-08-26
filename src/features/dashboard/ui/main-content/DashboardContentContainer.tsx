import CreateButtonWithDropdown from "@/features/create";
import { type ReactNode } from "react";

function DashboardContentContainer({ children }: { children: ReactNode }) {
  return (
    // <div className="relative border-foreground border-t-1 md:border-r-1 min-h-[calc(100vh-15rem)]">
    <div className="relative border-muted border-t-1 min-h-[calc(100vh-15rem)]">
      {/* <div className="hidden -top-6 -right-6 z-100 absolute place-content-center md:grid bg-transparent w-12 h-12">
        <Star />
      </div> */}
      {children}
      <CreateButtonWithDropdown />
    </div>
  );
}

export default DashboardContentContainer;
