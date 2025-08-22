/* eslint-disable react-refresh/only-export-components */
import StarFrame from "@/shared/ui/StarFrame";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router";
import { useDashboardMeta } from "../model/useDashboardMeta";
import DashboardHeader from "./header/DashboardHeader";
import DashboardToolbar from "./toolbar/DashboardToolbar";
import type { ViewModeSwitchType } from "./toolbar/ViewModeSwitch";

export type OutletContextType = ViewModeSwitchType & {
  searchString: string;
  viewMode: string;
  dashboardUserId: string;
};

export function DashboardLayout() {
  const [viewMode, setViewMode] = useState("gallery");
  const [searchString, setSearchString] = useState("");

  const {
    dashboardUserId,
    title,
    showDashboardOwner,
    isMobile,
    showNavigation,
  } = useDashboardMeta();

  return (
    <div className="flex flex-col gap-6 md:gap-10 mt-2 md:mt-4 px-2 md:px-0">
      <DashboardHeader
        title={title}
        showDashboardOwner={showDashboardOwner}
        dashboardUserId={dashboardUserId}
      />

      <DashboardToolbar
        isMobile={isMobile}
        searchString={searchString}
        setSearchString={setSearchString}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showNavigation={showNavigation}
      />

      <StarFrame>
        <div className="pt-4 md:pt-6 md:pr-8">
          <Outlet
            context={{
              viewMode,
              searchString,
              dashboardUserId,
            }}
          />
        </div>
      </StarFrame>
    </div>
  );
}

export function useDashboardContext() {
  return useOutletContext<OutletContextType>();
}
