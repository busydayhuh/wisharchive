import { useAuth } from "@/features/auth";
import { GlobalSearchDialog } from "@/features/global-search";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import { cn } from "@/shared/utils/css";
import { memo } from "react";
import Navigation from "../toolbar/Navigation";
import DashboardOwner from "./DashboardOwner";

type DashboardHeaderProps = {
  dashboardHeader: string | null;
  dashboardOwnerId?: string;
  isDashboardOwner: boolean;
};

const DashboardHeader = memo(function DashboardHeader({
  dashboardHeader,
  dashboardOwnerId,
  isDashboardOwner = true,
}: DashboardHeaderProps) {
  const { isLoggedIn } = useAuth();
  const { hasSearchParams: profileView } = useAppLocation();
  const isMobile = useIsMobile();
  const showOwner = !isMobile || !isDashboardOwner;

  if (isDashboardOwner && !profileView) {
    return (
      <div className="flex justify-between items-center gap-4 md:gap-6 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full">
        <p className="font-headers font-bold text-primary lg:text-[48px] text-3xl md:text-4xl leading-8">
          {dashboardHeader}
        </p>
        <div className="flex items-center gap-4 ms-auto">
          <GlobalSearchDialog />
          {showOwner && (
            <DashboardOwner
              userId={dashboardOwnerId}
              isOwner={isDashboardOwner}
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "items-start grid grid-cols-[3fr_1fr] md:grid-cols-3 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full",
        !isLoggedIn && "md:mt-0"
      )}
    >
      <div className="hidden md:block" />
      <div className="flex flex-col md:items-center gap-3">
        <DashboardOwner userId={dashboardOwnerId} isOwner={isDashboardOwner} />
        <Navigation />
      </div>
      <div className="flex justify-self-end items-center gap-4">
        {isLoggedIn && <GlobalSearchDialog />}
      </div>
    </div>
  );
});

export default DashboardHeader;
