import { useCurrentUser } from "@/features/profile/";
import { useAppLocation } from "@/shared/hooks/useAppLocation";
import { OwnerInfoPopover } from "@/shared/ui/components/OwnerInfoPopover";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { cn } from "@/shared/utils/css";
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

  if (loginArea || page.home) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 md:mt-2 px-1 md:px-0 py-0.5 border-b-1 md:border-b-0",
        !hasBreadcrumbs && "justify-between"
      )}
    >
      {isMobile && isUser && (
        <div className="px-2 rounded-[0.5rem]">
          <SidebarTrigger />
        </div>
      )}
      {hasBreadcrumbs && <Breadcrumbs />}
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
