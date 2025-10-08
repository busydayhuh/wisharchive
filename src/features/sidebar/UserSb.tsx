import { ChevronsUpDown } from "lucide-react";

import { ROUTES } from "@/shared/model/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/kit/sidebar";
import { GiFairyWand, GiOrbDirection, GiSun } from "react-icons/gi";
import { Link } from "react-router";
import { useAuth } from "../auth";

export function UserSb() {
  const { current, logout } = useAuth();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="rounded-lg w-8 h-8">
                <AvatarImage src={current!.prefs.avatar} alt={current!.name} />
                <AvatarFallback className="rounded-lg">ВП</AvatarFallback>
              </Avatar>
              <div className="flex-1 grid text-sm text-left leading-tight">
                <p className="font-medium truncate">{current!.name}</p>
                <p className="text-xs truncate">{current!.email}</p>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border-1 border-muted"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
                <Avatar className="rounded-lg w-8 h-8">
                  <AvatarImage
                    src={current!.prefs.avatar}
                    alt={current!.name}
                  />
                  <AvatarFallback className="rounded-lg">ВП</AvatarFallback>
                </Avatar>
                <div className="flex-1 grid text-sm text-left leading-tight">
                  <p className="font-medium truncate">{current!.name}</p>
                  <p className="text-xs truncate">{current!.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-muted" />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <GiSun />
                Выбрать тему
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.PROFILE}>
                  <GiFairyWand />
                  Настройки аккаунта
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-muted" />
            <DropdownMenuItem onClick={logout}>
              <GiOrbDirection />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
