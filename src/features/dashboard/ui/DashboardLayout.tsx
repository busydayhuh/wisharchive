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
    <div className="flex flex-col gap-11 mt-4">
      <div className="flex justify-between items-baseline">
        {isOwner && (
          <div className="font-semibold text-5xl leading-tight">
            Мой дашборд
          </div>
        )}
        <DashboardUser {...dashboardUser} />
      </div>
      <div className="flex justify-between items-end -mb-6 pr-8">
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
