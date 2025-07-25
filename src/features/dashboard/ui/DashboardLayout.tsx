/* eslint-disable react-refresh/only-export-components */
import { useSidebar } from "@/shared/ui/kit/sidebar";
import StarFrame from "@/shared/ui/StarFrame";
import { useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router";
import useFindUser from "../model/useFindUser";
import useIsDashboardOwner from "../model/useIsDashboardOwner";
import Navigation from "./Navigation";
import Searchbar from "./Searchbar";
import UserInfo from "./UserInfo";
import ViewModeSwitch, { type ViewModeSwitchType } from "./ViewModeSwitch";

type OutletContextType = ViewModeSwitchType & {
  isOwner: boolean;
  searchString: string | undefined;
  dashboardUserId: string | undefined;
};

export function DashboardLayout() {
  const dashboardUserId = useParams().userId;
  const dashboardUser = useFindUser(dashboardUserId);
  const { isMobile } = useSidebar();

  const isOwner = useIsDashboardOwner();

  const [viewMode, setViewMode] = useState("gallery");
  const [searchString, setSearchString] = useState("");

  return (
    <div className="flex flex-col gap-10 md:gap-12 mt-2 md:mt-4 px-2 md:px-0">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:gap-6">
        {isOwner && (
          <span className="mb-4 md:mb-0 max-w-xs font-semibold text-3xl md:text-4xl leading-8">
            Мой дашборд желаний
          </span>
        )}
        <UserInfo {...dashboardUser} />
      </div>
      <div className="flex flex-col gap-6 -mb-7 md:-mb-9 lg:pr-6">
        {isMobile && <Searchbar setSearchString={setSearchString} />}
        <div className="flex justify-between items-end gap-3 md:gap-5 w-full">
          <Navigation />
          {!isMobile && (
            <Searchbar
              setSearchString={setSearchString}
              className="ms-auto mr-2"
            />
          )}
          <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      <StarFrame>
        <Outlet
          context={{
            viewMode,
            isOwner,
            searchString,
            dashboardUserId,
          }}
        />
      </StarFrame>
    </div>
  );
}

export function useDashboardContext() {
  return useOutletContext<OutletContextType>();
}
