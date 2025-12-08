import { ROUTES } from "@/shared/config/routes";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { useCurrentUser } from "@/shared/hooks/user/useCurrentUser";
import Logo from "@/shared/ui/components/Logo";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { cn } from "@/shared/utils/css";
import { href, Link } from "react-router-dom";
import { OwnerInfoPopover } from "../dashboard";
import { Breadcrumbs } from "./Breadcrumbs";

export function BreadcrumbsBar({
  isMobile,
  isUser,
}: {
  isMobile: boolean;
  isUser: boolean;
}) {
  const { loginArea, page } = useAppLocation();
  const { user } = useCurrentUser();
  const hasBreadcrumbs = page.wish || page.list || page.edit;

  if (loginArea) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 md:mt-2 px-1 md:px-0 py-0.5",
        !hasBreadcrumbs && "justify-between"
      )}
    >
      {isMobile && isUser && (
        <div className="px-2 rounded-[0.5rem]">
          <SidebarTrigger />
        </div>
      )}
      {hasBreadcrumbs ? (
        <Breadcrumbs />
      ) : (
        isMobile && (
          <Link to={href(ROUTES.DASHBOARD, { userId: user?.userId ?? "" })}>
            <Logo variant="inverted" />
          </Link>
        )
      )}
      {isMobile && user && !hasBreadcrumbs && (
        <OwnerInfoPopover
          size="sm"
          id={user.userId}
          name={user.userName}
          avatarURL={user.avatarURL ?? undefined}
          email={user.userEmail}
        />
      )}
    </div>
  );
}
