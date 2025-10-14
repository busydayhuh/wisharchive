/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/shared/lib/css";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import { createContext, Suspense, useContext } from "react";
import { DashboardToolbarProvider } from "../model/DashboardToolbarContext";
import {
  useDashboardMeta,
  type DashboardMeta,
} from "../model/useDashboardMeta";
import DashboardHeader from "./header/DashboardHeader";
import { DashboardContentContainer } from "./main-content/DashboardContentContainer";
import { DashboardToolbar } from "./toolbar/DashboardToolbar";

const DashboardContext = createContext<DashboardMeta | null>(null);

export function DashboardLayout({
  header,
  children,
}: {
  header?: React.ReactElement;
  children: React.ReactNode;
}) {
  const meta = useDashboardMeta();

  const defaultDashboardHeader = (
    <DashboardHeader
      title={meta.title}
      showDashboardOwner={meta.showDashboardOwner}
      dashboardUserId={meta.dashboardUserId}
      isDashboardOwner={meta.isDashboardOwner}
    />
  );

  return (
    <DashboardContext.Provider value={meta}>
      <DashboardToolbarProvider
        dashboardType={meta.dashboardType}
        key={meta.dashboardType}
      >
        <div className="mt-1 md:mt-8 px-1 md:px-0">
          <div
            className={cn(
              "flex flex-col",
              !header && "gap-1 md:gap-6 lg:gap-10",
              header && "gap-2"
            )}
          >
            {header ? header : defaultDashboardHeader}

            <DashboardToolbar isOwner={meta.isDashboardOwner} />
          </div>

          <DashboardContentContainer>
            <Suspense fallback={<DefaultLoader />}>{children}</Suspense>
          </DashboardContentContainer>
        </div>
      </DashboardToolbarProvider>
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboardContext must be used inside DashboardLayout");
  return ctx;
}
