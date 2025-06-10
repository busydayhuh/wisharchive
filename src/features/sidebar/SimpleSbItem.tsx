import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/kit/sidebar";
import type { ReactNode } from "react";
import { Link } from "react-router";

function SimpleSbItem({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={name}>
        <Link to={href}>
          {icon}
          {name}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default SimpleSbItem;
