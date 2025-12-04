import { useAuth } from "@/features/auth";
import { GlobalSearchDialog } from "@/features/global-search";
import { useDepartment } from "@/shared/lib/react/useDepartment";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { Button } from "@/shared/ui/kit/button";
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
  const { profileView } = useDepartment();
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
    <div className="items-start grid grid-cols-[3fr_1fr] md:grid-cols-3 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full">
      <div className="hidden md:block" />
      <div className="flex flex-col md:items-center gap-3">
        <DashboardOwner userId={dashboardOwnerId} isOwner={isDashboardOwner} />
        <Navigation />
      </div>
      <div className="flex justify-self-end items-center gap-4">
        {isLoggedIn ? <GlobalSearchDialog /> : <Button>Войти</Button>}
      </div>
    </div>
  );
});

export default DashboardHeader;
