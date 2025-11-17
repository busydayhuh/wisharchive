import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/Logo";
import { ModeToggle } from "@/shared/ui/ModeToggle";
import {
  Archive,
  Blend,
  Bookmark,
  List,
  LockKeyhole,
  Orbit,
} from "lucide-react";
import { memo } from "react";
import { href, Link, matchPath, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import { UserSb } from "./UserSb";

export const AppSidebar = memo(function AppSidebar() {
  const { current } = useAuth();
  const { pathname: currentPath } = useLocation();
  const { isMobile } = useSidebar();

  const sidebarItems = [
    {
      name: "Мои желания",
      icon: <Orbit />,
      href: href(ROUTES.WISHES, { userId: current!.$id }),
    },
    {
      name: "Мои списки",
      icon: <List />,
      href: href(ROUTES.WISHLISTS, { userId: current!.$id }),
    },
    {
      name: "Хочу подарить",
      icon: <LockKeyhole />,
      href: ROUTES.BOOKED,
    },

    {
      name: "Закладки",
      icon: <Bookmark />,
      href: ROUTES.BOOKMARKS,
    },
    {
      name: "Совместные списки",
      icon: <Blend />,
      href: ROUTES.SHARED,
    },

    {
      name: "Архив желаний",
      icon: <Archive />,
      href: ROUTES.ARCHIVED,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex flex-row justify-center items-center gap-2 mb-2 py-3">
        <Link to={ROUTES.HOME}>
          <Logo variant="inverted" />
        </Link>
        {!isMobile && (
          <SidebarTrigger className="top-[50%] -right-2 absolute -translate-y-[100%]" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={cn(isMobile && "gap-0")}>
              {sidebarItems.map(({ name, icon, href }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    tooltip={name}
                    asChild
                    isActive={!!matchPath(currentPath, href)}
                    className={cn(isMobile && "h-12")}
                  >
                    <NavLink to={href}>
                      {icon}
                      {name}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem key="switcher">
          <SidebarMenuButton tooltip="Тема">
            <ModeToggle />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarSeparator className="self-center bg-accent" />
        <UserSb />
      </SidebarFooter>
    </Sidebar>
  );
});
