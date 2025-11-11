import { useUser } from "@/shared/model/user/useUser";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router";
import { DashboardToolbarProvider } from "../model/DashboardToolbarContext";
import { DashboardContext } from "../model/useDashboardContext";
import { useDashboardMeta } from "../model/useDashboardMeta";
import DashboardHeader from "./header/DashboardHeader";
import { DashboardContentContainer } from "./main-content/DashboardContentContainer";
import { DashboardToolbar } from "./toolbar/DashboardToolbar";

export function DashboardLayout({
  header,
  children,
}: {
  header?: React.ReactElement;
  children: React.ReactNode;
}) {
  const meta = useDashboardMeta();
  const { user, isLoading, error } = useUser(meta.dashboardUserId);
  const navigate = useNavigate();

  const noUser = !isLoading && !error && !user;

  useEffect(() => {
    if (noUser) navigate("/not-found");
  }, [noUser, navigate]);

  const defaultDashboardHeader = (
    <DashboardHeader
      title={meta.title}
      showDashboardOwner={meta.showDashboardOwner}
      dashboardUserId={meta.dashboardUserId}
      isDashboardOwner={meta.isDashboardOwner}
    />
  );

  return (
    <DashboardContext.Provider value={meta}>
      <DashboardToolbarProvider
        dashboardType={meta.dashboardType}
        localStorageKey={meta.localStorageKey}
        key={meta.dashboardType}
      >
        <div className="relative mt-4 md:mt-0 px-1 md:px-0">
          {header ? header : defaultDashboardHeader}

          <DashboardToolbar isOwner={meta.isDashboardOwner} />

          <DashboardContentContainer>
            <Suspense fallback={<DefaultLoader />}>{children}</Suspense>
          </DashboardContentContainer>
        </div>
      </DashboardToolbarProvider>
    </DashboardContext.Provider>
  );
}
