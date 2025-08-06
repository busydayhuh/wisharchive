/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@/features/auth";
import { useFindUser } from "@/features/dashboard/model/useFindUser";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import type { UserDocumentType } from "@/shared/model/types";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import StarFrame from "@/shared/ui/StarFrame";
import { useState } from "react";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router";
import Searchbar from "../../../../shared/ui/Searchbar";
import Navigation from "../Navigation";
import UserInfo from "../UserInfo";
import ViewModeSwitch, { type ViewModeSwitchType } from "../ViewModeSwitch";

export type OutletContextType = ViewModeSwitchType & {
  isDashboardOwner: boolean;
  searchString: string;
  dashboardUserId?: string;
  dashboardUser: {
    user: UserDocumentType | undefined;
    isLoading: boolean;
    error: unknown;
  };
  path?: string;
  authUser?: UserDocumentType;
};

const DASHBOARD_HEADERS = {
  [ROUTES.BOOKED]: {
    header: "Хочу подарить",
    description: "Забронированные вами желания",
  },
  [ROUTES.ARCHIVED]: {
    header: "Архив желаний",
    description: "Ваши желания, которые уже исполнились",
  },
  [ROUTES.SHARED]: {
    header: "Совместные списки",
    description: "Приватные списки, доступные вам",
  },
  [ROUTES.BOOKMARKS]: {
    header: "Избранные списки",
    description: "Списки, которые вы добавили в закладки",
  },
};

export function DashboardLayout() {
  const { current } = useUser();
  const path = useLocation().pathname;

  const dashboardHeader =
    DASHBOARD_HEADERS[path as keyof typeof DASHBOARD_HEADERS];

  const dashboardUserId = useParams().userId || current?.$id;
  const dashboardUser = useFindUser(dashboardUserId || "") as {
    user: UserDocumentType;
    isLoading: boolean;
    error: unknown;
  };

  const { isMobile } = useSidebar();

  const isDashboardOwner = current?.$id === dashboardUserId;

  const [viewMode, setViewMode] = useState("gallery");
  const [searchString, setSearchString] = useState("");

  return (
    <div className="flex flex-col gap-6 md:gap-10 mt-2 md:mt-4 px-2 md:px-0">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:gap-6">
        {dashboardHeader ? (
          <div className="flex flex-col gap-0.5 md:gap-1 mb-2 md:mb-0 max-w-xs">
            <span className="font-semibold text-3xl md:text-4xl leading-8">
              {dashboardHeader.header}
            </span>
          </div>
        ) : isDashboardOwner ? (
          <span className="mb-2 md:mb-0 max-w-xs font-semibold text-3xl md:text-4xl leading-8">
            Мой дашборд желаний
          </span>
        ) : null}

        {!isMobile ? (
          <UserInfo {...dashboardUser} />
        ) : !isDashboardOwner ? (
          <UserInfo {...dashboardUser} />
        ) : null}
      </div>
      <div className="top-0 z-10 sticky flex flex-col gap-6 bg-background md:mr-6 -mb-4 md:-mb-9 py-2">
        {isMobile && (
          <Searchbar
            searchString={searchString}
            setSearchString={setSearchString}
          />
        )}
        <div className="flex justify-between items-end gap-3 md:gap-5 w-full">
          <Navigation />
          {!isMobile && (
            <Searchbar
              searchString={searchString}
              setSearchString={setSearchString}
              className={cn(
                "mr-2",
                "md:justify-end w-full md:w-lg",
                !dashboardHeader ? "ms-auto" : "md:justify-start"
              )}
            />
          )}
          <ViewModeSwitch viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      <StarFrame>
        <div className="pt-4 md:pt-8 md:pr-8 example">
          <Outlet
            context={{
              viewMode,
              isDashboardOwner,
              searchString,
              dashboardUserId,
              dashboardUser,
              path,
              authUser: current,
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

// h-[calc(100vh-14rem)] overflow-y-scroll
