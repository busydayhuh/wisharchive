import { useAuth } from "@/features/auth";
import { useRoute } from "@/features/breadcrumbs";
import { useCollabWishlists } from "@/features/dashboard";
import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import { PRIVACY_ICONS } from "@/shared/ui/Badges";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { ResponsiveSelect, type Option } from "@/shared/ui/ResponsiveSelect";
import { ChevronDown } from "lucide-react";
import { href } from "react-router";

export function WishlistChanger({
  onValueChange,
  value,
  variant = "dashboard",
  className,
}: {
  onValueChange: (value: string, additional?: { isPrivate: boolean }) => void;
  value?: string;
  variant?: "dashboard" | "form";
  className?: string;
}) {
  const { current } = useAuth();
  const { navigateWithState } = useRoute();

  const { wishlists, isLoading, error } = useCollabWishlists({
    sort: { field: "$sequence", direction: "desc" },
    filters: [],
    limit: 100,
  });

  const options: Option[] = [
    {
      value: "none",
      label: "без списка",
      icon: PRIVACY_ICONS.none,
    },
    ...(wishlists ?? []).map((wl) => ({
      value: wl.$id,
      label: wl.title,
      additional: { ownerId: wl.ownerId },
      icon:
        wl.ownerId === current?.$id
          ? wl.isPrivate
            ? PRIVACY_ICONS.private
            : PRIVACY_ICONS.default
          : PRIVACY_ICONS.collab,
    })),
  ];

  const selected = options.find((o) => o.value === value);
  const handleNavigation = () => {
    if (!selected || selected.value === "none") {
      return undefined;
    }
    return navigateWithState(
      href(ROUTES.WISHLIST, {
        userId: selected.additional!.ownerId,
        listId: selected!.value,
      }),
      {
        userId: selected.additional!.ownerId,
        wlTitle: selected.label,
      }
    );
  };

  if (isLoading) return <Skeleton className={cn("w-32 h-10", className)} />;
  if (error) return null;

  if (wishlists)
    return (
      <div
        className={cn("flex items-center rounded-md overflow-clip", className)}
      >
        <button
          className={cn(
            "flex items-center gap-1.5 bg-secondary hover:bg-secondary/90 shadow-none px-1.5 py-1 pr-2 border-r-1 border-r-border/60 rounded-l-md h-10",
            selected?.value !== "none" && "cursor-pointer"
          )}
          onClick={handleNavigation}
        >
          {selected?.icon}
          <span className="max-w-[10ch] truncate">{selected?.label}</span>
        </button>

        <ResponsiveSelect
          options={options}
          onChange={onValueChange}
          value={value}
          renderTrigger={() => (
            <div className="md:hidden">
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          )}
          triggerCSS="h-10 bg-secondary rounded-r-md rounded-l-none flex items-center justify-center md:pl-0 py-5 px-2 md:pr-2 hover:bg-secondary/90"
          title="Выберите список"
          contentCSS={cn("max-h-md", variant === "dashboard" && "w-xs")}
          renderOption={(opt) => (
            <span className={cn("flex items-center gap-2")}>
              {opt.icon} {opt.label}
            </span>
          )}
        />
      </div>
    );
}
