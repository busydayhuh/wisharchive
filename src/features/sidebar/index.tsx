import { ROUTES } from "@/shared/model/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/shared/ui/kit/sidebar";
import Logo from "@/shared/ui/logo";
import {
  GiChainedHeart,
  GiDuality,
  GiFallingStar,
  GiGems,
  GiOrbital,
} from "react-icons/gi";
import { href } from "react-router-dom";
import { useUser } from "../auth";
import CollapsibleSbItem from "./CollapsibleSbItem";
import SimpleSbItem from "./SimpleSbItem";
import { UserSb } from "./UserSb";

export function AppSidebar() {
  const { current } = useUser();
  const { state: sbState } = useSidebar();

  const simpleItems = [
    {
      name: "Мой дашборд",
      icon: <GiOrbital />,
      href: href(ROUTES.WISHES, { userId: current!.$id }),
    },
    {
      name: "Хочу подарить",
      icon: <GiChainedHeart />,
      href: ROUTES.BOOKED,
    },
    {
      name: "Совместные списки",
      icon: <GiDuality />,
      href: ROUTES.SHARED,
    },
    {
      name: "Архив моих желаний",
      icon: <GiGems />,
      href: ROUTES.ARCHIVED,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mb-2 flex flex-row gap-2 border-b-1 border-muted py-3">
        <Logo width={6} />
        {sbState === "expanded" ? (
          <div className="font-medium">wisharchive</div>
        ) : null}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
              <CollapsibleSbItem name="Мои списки" icon={<GiFallingStar />} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserSb />
      </SidebarFooter>
    </Sidebar>
  );
}
