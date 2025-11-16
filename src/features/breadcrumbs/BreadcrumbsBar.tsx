import { cn } from "@/shared/lib/css";
import { useDepartment } from "@/shared/lib/react/useDepartment";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/Logo";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Breadcrumbs } from "./Breadcrumbs";

export function BreadcrumbsBar({
  isMobile,
  isUser,
}: {
  isMobile: boolean;
  isUser: boolean;
}) {
  const { outside, hasBreadcrumbs } = useDepartment();
  const { user } = useCurrentUser();

  if (outside) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-1 md:px-0 py-0.5",
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
        isMobile && <Logo variant="default" />
      )}
      {isMobile && user && !hasBreadcrumbs && (
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
