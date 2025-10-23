import DefaultLoader from "@/shared/ui/DefaultLoader";
import { Suspense } from "react";
import { DashboardToolbarProvider } from "../model/DashboardToolbarContext";
import { DashboardContext } from "../model/useDashboardContext";
import { useDashboardMeta } from "../model/useDashboardMeta";
import DashboardHeader from "./header/DashboardHeader";
import { DashboardContentContainer } from "./main-content/DashboardContentContainer";
import { DashboardToolbar } from "./toolbar/DashboardToolbar";

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
        localStorageKey={meta.localStorageKey}
        key={meta.dashboardType}
      >
        <div className="relative mt-1 md:mt-8 px-1 md:px-0">
          <div className="mb-2 md:mb-4">
            {header ? header : defaultDashboardHeader}
          </div>
          <DashboardToolbar isOwner={meta.isDashboardOwner} />

          <DashboardContentContainer>
            <Suspense fallback={<DefaultLoader />}>{children}</Suspense>
          </DashboardContentContainer>
        </div>
      </DashboardToolbarProvider>
    </DashboardContext.Provider>
  );
}
