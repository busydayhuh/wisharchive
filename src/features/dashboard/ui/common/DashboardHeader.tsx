import { memo } from "react";
import DashboardOwner from "./DashboardOwner";

type DashboardHeaderProps = {
  title: string | null;
  showDashboardOwner: boolean;
  dashboardUserId?: string;
};

const DashboardHeader = memo(function DashboardHeader({
  title,
  showDashboardOwner,
  dashboardUserId,
}: DashboardHeaderProps) {
  return (
    <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 md:gap-6">
      {title && (
        <span className="max-w-xs font-semibold text-3xl md:text-4xl leading-8">
          {title}
        </span>
      )}
      {showDashboardOwner && <DashboardOwner userId={dashboardUserId} />}
    </div>
  );
});

export default DashboardHeader;
