import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/Logo";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { matchRoutes } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { useRoute } from "./model/createRouteContext";

export function BreadcrumbsBar({
  isMobile,
  isUser,
}: {
  isMobile: boolean;
  isUser: boolean;
}) {
  const { location } = useRoute();

  const hasBreadcrumbs = [
    { path: ROUTES.WISH },
    { path: ROUTES.WISHLIST },
    { path: ROUTES.EDIT },
  ];
  const showBreadcrumbs = Boolean(
    matchRoutes(hasBreadcrumbs, location.pathname)
  );
  const { user } = useCurrentUser();

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-1 md:px-0 py-0.5",
        !showBreadcrumbs && "justify-between"
      )}
    >
      {isMobile && isUser && (
        <div className="px-2 rounded-[0.5rem]">
          <SidebarTrigger />
        </div>
      )}
      {showBreadcrumbs ? (
        <Breadcrumbs />
      ) : (
        isMobile && <Logo variant="default" />
      )}
      {isMobile && user && !showBreadcrumbs && (
        <UserAvatar
          size="sm"
          id={user.userId}
          name={user.userName}
          avatarURL={user.avatarURL ?? undefined}
        />
      )}
    </div>
  );
}
