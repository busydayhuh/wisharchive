import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { Avatar, AvatarFallback } from "@/shared/ui/kit/avatar";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/Logo";
import { AvatarImage } from "@radix-ui/react-avatar";
import { matchRoutes } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

export function BreadcrumbsBar({
  isMobile,
  path,
  isUser,
}: {
  isMobile: boolean;
  path: string | Partial<Location>;
  isUser: boolean;
}) {
  const hasBreadcrumbs = [
    { path: ROUTES.WISH },
    { path: ROUTES.WISHLIST },
    { path: ROUTES.EDIT },
  ];
  const showBreadcrumbs = Boolean(matchRoutes(hasBreadcrumbs, path));
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
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={user.avatarURL ?? undefined}
            alt={user.userName}
            className="rounded-full"
          />
          <AvatarFallback className="rounded-full text-xs"></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
