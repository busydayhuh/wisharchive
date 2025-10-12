/* eslint-disable react-refresh/only-export-components */
import { Outlet, useOutletContext } from "react-router";
import { DashboardToolbarProvider } from "../model/DashboardToolbarContext";
import type { DashboardType } from "../model/toolbarConfig";
import { useDashboardMeta } from "../model/useDashboardMeta";
import DashboardHeader from "./header/DashboardHeader";
import { DashboardContentContainer } from "./main-content/DashboardContentContainer";
import { DashboardToolbar } from "./toolbar/DashboardToolbar";
import type { ViewModeSwitchType } from "./toolbar/ViewModeSwitch";

export type OutletContextType = ViewModeSwitchType & {
  searchString: string;
  viewMode: "gallery" | "table";
  dashboardUserId: string;
};

export function DashboardLayoutWrapper({
  dashboardType,
}: {
  dashboardType: DashboardType;
}) {
  return (
    <DashboardToolbarProvider dashboardType={dashboardType}>
      <DashboardLayout />
    </DashboardToolbarProvider>
  );
}

export function DashboardLayout() {
  const {
    dashboardUserId,
    title,
    showDashboardOwner,
    dashboardType,
    isDashboardOwner,
  } = useDashboardMeta();

  return (
    <DashboardToolbarProvider dashboardType={dashboardType as DashboardType}>
      <div className="mt-1 md:mt-8 px-1 md:px-0">
        <div className="flex flex-col gap-1 md:gap-6 lg:gap-10">
          <DashboardHeader
            title={title}
            showDashboardOwner={showDashboardOwner}
            dashboardUserId={dashboardUserId}
            isDashboardOwner={isDashboardOwner}
          />

          <DashboardToolbar isOwner={isDashboardOwner} />
        </div>

        <DashboardContentContainer>
          <Outlet
            context={{
              dashboardUserId,
            }}
          />
        </DashboardContentContainer>
      </div>
    </DashboardToolbarProvider>
  );
}

export function useDashboardContext() {
  return useOutletContext<OutletContextType>();
}
