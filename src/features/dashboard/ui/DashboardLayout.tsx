/* eslint-disable react-refresh/only-export-components */
import StarFrame from "@/shared/ui/StarFrame";
import { useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router";
import useFindUser from "../model/useFindUser";
import useIsDashboardOwner from "../model/useIsDashboardOwner";
import DashboardGalleryModeSwitch, {
  type DashboardGalleryModeSwitchType,
} from "./DashboardGalleryModeSwitch";
import DashboardNav from "./DbNav";
import DashboardUser from "./DbUser";

type OutletContextType = DashboardGalleryModeSwitchType & { isOwner: boolean };

export function DashboardLayout() {
  const dashboardUserId = useParams().userId;
  const dashboardUser = useFindUser(dashboardUserId);

  const isOwner = useIsDashboardOwner();
  const [galleryMode, setGalleryMode] = useState("gallery");

  return (
    <div className="flex flex-col gap-6 md:gap-8 mt-2 md:mt-4 px-2 md:px-0">
      <div className="flex md:flex-row flex-col justify-between items-baseline gap-6">
        {isOwner && (
          <div className="font-semibold text-3xl md:text-4xl leading-tight">
            Мой дашборд
          </div>
        )}
        <DashboardUser {...dashboardUser} />
      </div>
      <div className="flex justify-between items-end -mb-3 md:-mb-6 pr-1 md:pr-8">
        <DashboardNav />
        <DashboardGalleryModeSwitch
          galleryMode={galleryMode}
          setGalleryMode={setGalleryMode}
        />
      </div>
      <StarFrame>
        <Outlet context={{ galleryMode, setGalleryMode, isOwner }} />
      </StarFrame>
    </div>
  );
}

export function useGalleryMode() {
  return useOutletContext<OutletContextType>();
}
