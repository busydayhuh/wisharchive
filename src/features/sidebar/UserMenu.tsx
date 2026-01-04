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

import { useUser } from "@/features/profile";
import { ROUTES } from "@/shared/config/routes";
import { useTheme } from "@/shared/store/theme/useTheme";
import { UserAvatar } from "@/shared/ui/components/UserAvatar";
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
import { Link } from "react-router-dom";
import { useAuth } from "../auth";

export function UserMenu() {
  const { current, logout, userId } = useAuth();
  const { isMobile } = useSidebar();
  const { user } = useUser(userId ?? null);
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
              className="data-[state=open]:bg-sidebar-accent rounded-md data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <UserAvatar
                name={user?.userName ?? ""}
                id={userId ?? ""}
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
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border-1 border-muted bg-popover"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
                <UserAvatar
                  name={user?.userName ?? ""}
                  id={userId ?? ""}
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
                  <DropdownMenuSubContent className="bg-popover">
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
                  Редактировать профиль
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
