import { useAuth } from "@/features/auth";
import { GlobalSearchDialog } from "@/features/global-search";
import { Button } from "@/shared/ui/kit/button";
import { memo } from "react";
import Navigation from "../toolbar/Navigation";
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
  const { isLoggedIn } = useAuth();

  if (isDashboardOwner) {
    return (
      <div className="flex justify-between items-center gap-4 md:gap-6 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full">
        <p className="font-bold text-primary text-3xl md:text-4xl lg:text-5xl leading-8">
          {title}
        </p>
        <div className="flex items-center gap-4 ms-auto">
          <GlobalSearchDialog />
          {showDashboardOwner && (
            <DashboardOwner
              userId={dashboardUserId}
              isOwner={isDashboardOwner}
            />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="items-baseline grid grid-cols-[3fr_1fr] md:grid-cols-3 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full">
        <div className="hidden md:block" />
        <div className="flex flex-col md:items-center gap-3">
          <DashboardOwner userId={dashboardUserId} isOwner={isDashboardOwner} />
          <Navigation />
        </div>
        <div className="justify-self-end">
          {isLoggedIn ? <GlobalSearchDialog /> : <Button>Войти</Button>}
        </div>
      </div>
    );
  }
});

export default DashboardHeader;
