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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/Logo";
import { Archive, Blend, Bookmark, Orbit } from "lucide-react";
import { memo } from "react";
import { href, Link } from "react-router-dom";
import { useAuth } from "../auth";
import { UserSb } from "./UserSb";

export const AppSidebar = memo(function AppSidebar() {
  const { current } = useAuth();
  const { state: sbState } = useSidebar();

  const sidebarItems = [
    {
      name: "Мой дашборд",
      icon: <Orbit className="stroke-(length:--sidebar-icons-stroke)" />,
      href: href(ROUTES.WISHES, { userId: current!.$id }),
      subItems: [
        {
          name: "Мои желания",
          href: href(ROUTES.WISHES, { userId: current!.$id }),
        },
        {
          name: "Мои вишлисты",
          href: href(ROUTES.WISHLISTS, { userId: current!.$id }),
        },
        {
          name: "Хочу подарить",
          href: ROUTES.BOOKED,
        },
      ],
    },
    {
      name: "Избранные списки",
      icon: <Bookmark className="stroke-(length:--sidebar-icons-stroke)" />,
      href: ROUTES.BOOKMARKS,
    },
    {
      name: "Совместные списки",
      icon: <Blend className="stroke-(length:--sidebar-icons-stroke)" />,
      href: ROUTES.SHARED,
    },

    {
      name: "Архив желаний",
      icon: <Archive className="stroke-(length:--sidebar-icons-stroke)" />,
      href: ROUTES.ARCHIVED,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row gap-2 mb-2 py-3 border-muted border-b-1">
        <Logo />
        {sbState === "expanded" ? (
          <div className="font-semibold">wisharchive</div>
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(({ name, icon, href, subItems }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton asChild tooltip={name}>
                    <Link to={href}>
                      {icon}
                      {name}
                    </Link>
                  </SidebarMenuButton>
                  {subItems && (
                    <SidebarMenuSub>
                      {subItems.map(({ name, href }) => {
                        return (
                          <SidebarMenuSubItem key={name}>
                            <SidebarMenuSubButton asChild>
                              <Link to={href}>{name}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  )}
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
