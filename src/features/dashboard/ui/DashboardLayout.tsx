/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router";
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

export function DashboardLayout() {
  const [viewMode, setViewMode] = useState<"gallery" | "table">("gallery");
  const [searchString, setSearchString] = useState("");

  const { dashboardUserId, title, showDashboardOwner, showNavigation } =
    useDashboardMeta();

  return (
    <div className="mt-2 md:mt-4 px-1 md:px-0">
      <div className="flex flex-col gap-4 md:gap-10 lg:gap-16">
        <DashboardHeader
          title={title}
          showDashboardOwner={showDashboardOwner}
          dashboardUserId={dashboardUserId}
        />

        <DashboardToolbar
          searchString={searchString}
          setSearchString={setSearchString}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showNavigation={showNavigation}
        />
      </div>

      <DashboardContentContainer>
        <Outlet
          context={{
            viewMode,
            searchString,
            dashboardUserId,
          }}
        />
      </DashboardContentContainer>
    </div>
  );
}

export function useDashboardContext() {
  return useOutletContext<OutletContextType>();
}
