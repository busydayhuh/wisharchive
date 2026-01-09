import { ROUTES } from "@/shared/config/routes";
import Logo from "@/shared/ui/components/Logo";
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
import { ModeToggle } from "./ModeToggle";
import { UserMenu } from "./UserMenu";

export const AppSidebar = memo(function AppSidebar() {
  const { userId } = useAuth();
  const { pathname: currentPath } = useLocation();
  const { isMobile } = useSidebar();

  const sidebarItems = [
    {
      name: "Мои желания",
      icon: <Orbit />,
      href: href(ROUTES.WISHES, { userId: userId! }),
    },
    {
      name: "Мои списки",
      icon: <List />,
      href: href(ROUTES.WISHLISTS, { userId: userId! }),
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
            <SidebarMenu className="gap-0">
              {sidebarItems.map(({ name, icon, href }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    tooltip={name}
                    asChild
                    isActive={!!matchPath(currentPath, href)}
                    className="h-12 md:h-auto"
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
          <SidebarMenuButton tooltip="Тема" className="h-12">
            <ModeToggle />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarSeparator className="self-center bg-sidebar-accent" />
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
});
