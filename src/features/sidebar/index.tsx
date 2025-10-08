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
  SidebarTrigger,
  useSidebar,
} from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/Logo";
import {
  Archive,
  Blend,
  Bookmark,
  List,
  LockKeyhole,
  Orbit,
} from "lucide-react";
import { memo } from "react";
import { href, matchPath, NavLink, useLocation } from "react-router-dom";
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
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex flex-row justify-center items-center gap-2 mb-2 py-3">
        <Logo />
        {!isMobile && (
          <SidebarTrigger className="top-[50%] -right-2 absolute -translate-y-[100%]" />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(({ name, icon, href }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    tooltip={name}
                    asChild
                    isActive={!!matchPath(currentPath, href)}
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
        <UserSb />
      </SidebarFooter>
    </Sidebar>
  );
});
