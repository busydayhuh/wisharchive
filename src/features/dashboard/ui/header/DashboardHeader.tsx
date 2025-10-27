import { GlobalSearchDialog } from "@/features/global-search";
import { memo } from "react";
import DashboardOwner from "./DashboardOwner";

type DashboardHeaderProps = {
  title: string | null;
  showDashboardOwner: boolean;
  dashboardUserId?: string;
  isDashboardOwner: boolean;
};

const DashboardHeader = memo(function DashboardHeader({
  title,
  showDashboardOwner,
  dashboardUserId,
  isDashboardOwner = true,
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between md:items-center gap-4 md:gap-6 mb-1.5 md:mb-3 lg:mb-8 pt-1.5 md:pt-0">
      {title && isDashboardOwner && (
        <p className="font-bold text-3xl md:text-4xl lg:text-5xl leading-8">
          {title}
        </p>
      )}
      <div className="flex items-center gap-4">
        <GlobalSearchDialog />
        {showDashboardOwner && (
          <DashboardOwner userId={dashboardUserId} isOwner={isDashboardOwner} />
        )}
      </div>
    </div>
  );
});

export default DashboardHeader;
