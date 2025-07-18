/* eslint-disable react-refresh/only-export-components */
import { useSidebar } from "@/shared/ui/kit/sidebar";
import StarFrame from "@/shared/ui/StarFrame";
import { useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router";
import useFindUser from "../model/useFindUser";
import useIsDashboardOwner from "../model/useIsDashboardOwner";
import DashboardGalleryModeSwitch, {
  type DashboardGalleryModeSwitchType,
} from "./DashboardGalleryModeSwitch";
import DashboardNav from "./DbNav";
import DbSearchbar from "./DbSearchbar";
import DashboardUser from "./DbUser";

type OutletContextType = DashboardGalleryModeSwitchType & {
  isOwner: boolean;
  searchQuery: null | string;
};

export function DashboardLayout() {
  const dashboardUserId = useParams().userId;
  const dashboardUser = useFindUser(dashboardUserId);
  const { isMobile } = useSidebar();

  const isOwner = useIsDashboardOwner();
  const [galleryMode, setGalleryMode] = useState("gallery");
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10 md:gap-12 mt-2 md:mt-4 px-2 md:px-0">
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:gap-6">
        {isOwner && (
          <span className="mb-4 md:mb-0 max-w-xs font-semibold text-3xl md:text-4xl leading-8">
            Мой дашборд желаний
          </span>
        )}
        <DashboardUser {...dashboardUser} />
      </div>
      <div className="flex flex-col gap-6 -mb-7 md:-mb-9 lg:pr-6">
        {isMobile && <DbSearchbar setSearchQuery={setSearchQuery} />}
        <div className="flex justify-between items-center gap-3 w-full">
          <DashboardNav />
          {!isMobile && (
            <DbSearchbar
              setSearchQuery={setSearchQuery}
              className="ms-auto mr-2"
            />
          )}
          <DashboardGalleryModeSwitch
            galleryMode={galleryMode}
            setGalleryMode={setGalleryMode}
          />
        </div>
      </div>
      <StarFrame>
        <Outlet
          context={{ galleryMode, setGalleryMode, isOwner, searchQuery }}
        />
      </StarFrame>
    </div>
  );
}

export function useDashboardContext() {
  return useOutletContext<OutletContextType>();
}
