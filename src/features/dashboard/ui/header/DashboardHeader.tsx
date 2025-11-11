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
      <div className="flex justify-between gap-4 md:gap-6 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full">
        <p className="font-bold text-3xl md:text-4xl lg:text-5xl leading-8">
          {title}
        </p>
        <div className="flex items-center gap-4 ms-auto">
          {isLoggedIn ? <GlobalSearchDialog /> : <Button>Войти</Button>}
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
      <div className="grid grid-cols-[3fr_1fr] md:grid-cols-3 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8 w-full">
        <div className="hidden md:block" />
        <div className="flex flex-col md:items-center gap-3">
          <DashboardOwner userId={dashboardUserId} isOwner={isDashboardOwner} />
          <Navigation />
        </div>
        <div className="justify-self-end">
          {isLoggedIn && <GlobalSearchDialog />}
        </div>
      </div>
    );
  }

  // return (
  //   <div className="flex justify-between gap-4 md:gap-6 mt-1.5 md:mt-4 mb-1.5 md:mb-3 lg:mb-8">
  //     {title && isDashboardOwner && (
  //       <p className="font-bold text-3xl md:text-4xl lg:text-5xl leading-8">
  //         {title}
  //       </p>
  //     )}
  //     {isLoggedIn ? (
  //       <div
  //         className={cn(
  //           "flex items-center gap-4 w-full",
  //           !isDashboardOwner &&
  //             "flex-row-reverse justify-between items-start relative"
  //         )}
  //       >
  //         <GlobalSearchDialog />
  //         {showDashboardOwner && (
  //           <div
  //             className={cn(
  //               "flex flex-col gap-3 lg:gap-5",
  //               !isDashboardOwner &&
  //                 "absolute left-1/2 -translate-x-1/2 items-center"
  //             )}
  //           >
  //             <DashboardOwner
  //               userId={dashboardUserId}
  //               isOwner={isDashboardOwner}
  //             />
  //             {!isDashboardOwner && <Navigation />}
  //           </div>
  //         )}
  //       </div>
  //     ) : (
  //       <div className="justify-between items-center w-full">
  //         {showDashboardOwner && (
  //           <div className="flex flex-col gap-3 lg:gap-5">
  //             <DashboardOwner
  //               userId={dashboardUserId}
  //               isOwner={isDashboardOwner}
  //             />
  //             {!isDashboardOwner && <Navigation />}
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
});

export default DashboardHeader;
