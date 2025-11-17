import {
  Check,
  ChevronsUpDown,
  LogOut,
  Moon,
  Paintbrush,
  Settings,
  Sun,
  SunMoon,
} from "lucide-react";

import { ROUTES } from "@/shared/model/routes";
import { useTheme } from "@/shared/model/theme/createThemeProvider";
import { useUser } from "@/shared/model/user/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/kit/sidebar";
import { UserAvatar } from "@/shared/ui/UserAvatar";
import { Link } from "react-router";
import { useAuth } from "../auth";

export function UserSb() {
  const { current, logout } = useAuth();
  const { isMobile } = useSidebar();
  const { user } = useUser(current?.$id ?? null);
  const { theme, setTheme } = useTheme();

  const onThemeChange = (
    e: React.MouseEvent,
    theme: "dark" | "light" | "system"
  ) => {
    e.preventDefault();
    setTheme(theme);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent rounded-full data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <UserAvatar
                name={user?.userName ?? ""}
                id={current?.$id ?? ""}
                avatarURL={user?.avatarURL ?? undefined}
                size="md"
                className="border-0 w-8 h-8 text-foreground shrink-0"
              />
              <div className="flex-1 grid text-sm text-left leading-tight">
                <p className="font-medium truncate">{current!.name}</p>
                <p className="text-xs truncate">{current!.email}</p>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border-1 border-muted bg-sidebar-accent"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
                <UserAvatar
                  name={user?.userName ?? ""}
                  id={current?.$id ?? ""}
                  avatarURL={user?.avatarURL ?? undefined}
                  size="md"
                />
                <div className="flex-1 grid text-sm text-left leading-tight">
                  <p className="font-medium truncate">{current!.name}</p>
                  <p className="text-muted-foreground text-xs truncate">
                    {current!.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-muted" />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SunMoon className="size-4 text-muted-foreground" /> Выбрать
                  тему
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="bg-sidebar-accent">
                    <DropdownMenuItem
                      onClick={(e) => onThemeChange(e, "light")}
                    >
                      <Sun />
                      Светлая
                      {theme === "light" && (
                        <Check className="size-4 text-muted-foreground" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => onThemeChange(e, "dark")}>
                      <Moon />
                      Тёмная
                      {theme === "dark" && (
                        <Check className="size-4 text-muted-foreground" />
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => onThemeChange(e, "system")}
                    >
                      <Paintbrush />
                      Системная
                      {theme === "system" && (
                        <Check className="size-4 text-muted-foreground" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <Link to={ROUTES.PROFILE}>
                  <Settings />
                  Настройки аккаунта
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-muted" />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
