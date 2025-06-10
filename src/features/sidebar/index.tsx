import { ROUTES } from "@/shared/model/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/shared/ui/kit/sidebar";
import { Star } from "lucide-react";
import { href } from "react-router-dom";
import { useUser } from "../auth";
import CollapsibleSbItem from "./CollapsibleSbItem";
import SimpleSbItem from "./SimpleSbItem";

export function AppSidebar() {
  const { current } = useUser();

  const simpleItems = [
    {
      name: "Мой дашборд",
      icon: <Star />,
      href: href(ROUTES.WISHES, { userId: current!.$id }),
    },
    {
      name: "Хочу подарить",
      icon: <Star />,
      href: ROUTES.BOOKED,
    },
    {
      name: "Совместные списки",
      icon: <Star />,
      href: ROUTES.SHARED,
    },
    {
      name: "Архив желаний",
      icon: <Star />,
      href: ROUTES.ARCHIVED,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Wisharchive</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {simpleItems.map((item) => (
                <SimpleSbItem
                  name={item.name}
                  icon={item.icon}
                  href={item.href}
                  key={item.name}
                />
              ))}
              <CollapsibleSbItem name="Мои списки" icon={<Star />} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
