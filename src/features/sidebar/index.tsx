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
import { memo } from "react";
import {
  GiBlackHoleBolas,
  GiOrbital,
  GiOrbitalRays,
  GiSpoutnik,
} from "react-icons/gi";
import { href, Link } from "react-router-dom";
import { useUser } from "../auth";
import { UserSb } from "./UserSb";

export const AppSidebar = memo(function AppSidebar() {
  const { current } = useUser();
  const { state: sbState } = useSidebar();

  const sidebarItems = [
    {
      name: "Мой дашборд",
      icon: <GiOrbital />,
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
      icon: <GiOrbitalRays />,
      href: ROUTES.SHARED,
    },
    {
      name: "Совместные списки",
      icon: <GiSpoutnik />,
      href: ROUTES.SHARED,
    },

    {
      name: "Архив желаний",
      icon: <GiBlackHoleBolas />,
      href: ROUTES.ARCHIVED,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mb-2 flex flex-row gap-2 border-b-1 border-muted py-3">
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
