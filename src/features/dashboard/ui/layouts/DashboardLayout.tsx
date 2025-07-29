/* eslint-disable react-refresh/only-export-components */
import { useUser } from "@/features/auth";
import useFindUser from "@/features/dashboard/model/useFindUser";
import { ROUTES } from "@/shared/model/routes";
import type { UserDocumentType } from "@/shared/model/types";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import StarFrame from "@/shared/ui/StarFrame";
import { useState } from "react";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router";
import Navigation from "../Navigation";
import Searchbar from "../Searchbar";
import UserInfo from "../UserInfo";
import ViewModeSwitch, { type ViewModeSwitchType } from "../ViewModeSwitch";

export type OutletContextType = ViewModeSwitchType & {
  isOwner: boolean;
  searchString: string;
  dashboardUserId?: string;
  dashboardUser: {
    user: UserDocumentType | undefined;
    isLoading: boolean;
    error: unknown;
  };
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

  const dashboardHeader =
    DASHBOARD_HEADERS[useLocation().pathname as keyof typeof DASHBOARD_HEADERS];

  const dashboardUserId = useParams().userId || current?.$id;
  const dashboardUser = useFindUser(dashboardUserId);

  const { isMobile } = useSidebar();

  const isOwner = current?.$id === dashboardUserId;

  const [viewMode, setViewMode] = useState("gallery");
  const [searchString, setSearchString] = useState("");

  return (
    <div className="flex flex-col gap-6 md:gap-12 mt-2 md:mt-4 px-2 md:px-0">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:gap-6">
        {dashboardHeader ? (
          <div className="flex flex-col gap-0.5 md:gap-1 mb-2 md:mb-0 max-w-xs">
            <span className="font-semibold text-3xl md:text-4xl leading-8">
              {dashboardHeader.header}
            </span>
            <span className="text-muted-foreground text-xs md:text-sm">
              {dashboardHeader.description}
            </span>
          </div>
        ) : isOwner ? (
          <span className="mb-2 md:mb-0 max-w-xs font-semibold text-3xl md:text-4xl leading-8">
            Мой дашборд желаний
          </span>
        ) : null}

        {!isMobile ? (
          <UserInfo {...dashboardUser} />
        ) : !isOwner ? (
          <UserInfo {...dashboardUser} />
        ) : null}
      </div>
      <div className="flex flex-col gap-6 -mb-4 md:-mb-9 lg:pr-6">
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
            dashboardUser,
          }}
        />
      </StarFrame>
    </div>
  );
}

export function useDashboardContext() {
  return useOutletContext<OutletContextType>();
}
