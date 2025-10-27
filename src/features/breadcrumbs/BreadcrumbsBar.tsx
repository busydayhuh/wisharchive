import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { Avatar, AvatarFallback } from "@/shared/ui/kit/avatar";
import { SidebarTrigger } from "@/shared/ui/kit/sidebar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { matchRoutes } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

export function BreadcrumbsBar({
  path,
  isUser,
}: {
  path: string | Partial<Location>;
  isUser: boolean;
}) {
  const isMobile = useIsMobile();
  const hasBreadcrumbs = [
    { path: ROUTES.WISH },
    { path: ROUTES.WISHLIST },
    { path: ROUTES.EDIT },
  ];
  const showBreadcrumbs = Boolean(matchRoutes(hasBreadcrumbs, path));
  const { user } = useCurrentUser();

  return (
    <div className="flex items-baseline gap-2.5 px-0.5 md:px-0 py-0.5">
      {isMobile && isUser && <SidebarTrigger />}

      {showBreadcrumbs && (
        <>
          <Breadcrumbs />
        </>
      )}
      {isMobile && user && !showBreadcrumbs && (
        <Avatar className="ms-auto w-6 h-6">
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
