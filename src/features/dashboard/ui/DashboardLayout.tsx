import { useDashboardMeta } from "../model/hooks/useDashboardMeta";
import { DashboardContext } from "../model/store/dashboard/Context";
import { ToolbarProvider } from "../model/store/toolbar/ToolbarProvider";
import { ContentWrapper } from "./content/ContentWrapper";
import DashboardHeader from "./header/DashboardHeader";
import { DashboardToolbar } from "./toolbar/DashboardToolbar";

export function DashboardLayout({
  header,
  children,
}: {
  header?: React.ReactElement;
  children: React.ReactNode;
}) {
  const meta = useDashboardMeta();

  return (
    <DashboardContext.Provider value={meta}>
      <ToolbarProvider
        dashboardType={meta.dashboardType}
        localStorageKey={meta.localStorageKey}
        key={meta.dashboardType}
      >
        <div className="relative space-y-2 md:space-y-0 mt-2 px-1 md:px-0">
          {header ? header : <DashboardHeader {...meta} />}
          <DashboardToolbar isOwner={meta.isDashboardOwner} />
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </ToolbarProvider>
    </DashboardContext.Provider>
  );
}
