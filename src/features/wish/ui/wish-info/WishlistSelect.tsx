import { useAuth } from "@/features/auth";
import { useCollabWishlists } from "@/features/dashboard";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ArrowLeftRightIcon, Eye, EyeClosed, Users2, X } from "lucide-react";

export function WishlistSelect({
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
  const isMobile = useIsMobile();

  const { wishlists, isLoading, error } = useCollabWishlists({
    sort: { field: "$sequence", direction: "desc" },
    filters: [],
  });

  const icons = {
    default: (
      <span className="bg-chart-4 p-2 rounded-sm [&_svg]:size-3 text-foreground">
        <Eye />
      </span>
    ),
    private: (
      <span className="bg-chart-1 p-2 rounded-sm [&_svg]:size-3">
        <EyeClosed />
      </span>
    ),
    collab: (
      <span className="bg-chart-3 p-2 rounded-sm [&_svg]:size-3 text-sky-800">
        <Users2 />
      </span>
    ),
    none: (
      <span className="bg-muted p-2 rounded-sm [&_svg]:size-3 text-muted-foreground">
        <X />
      </span>
    ),
  };

  const options = [
    {
      value: "none",
      label: "без списка",
      icon: icons.none,
      additional: { isPrivate: false },
    },
    ...(wishlists ?? []).map((wl) => ({
      value: wl.$id,
      label: wl.title,
      icon:
        wl.ownerId === current?.$id
          ? wl.isPrivate
            ? icons.private
            : icons.default
          : icons.collab,
    })),
  ];

  return (
    <ResponsiveSelect
      options={options}
      onChange={onValueChange}
      value={value}
      renderTrigger={(selected) =>
        variant === "dashboard" && isMobile ? (
          <ArrowLeftRightIcon className="size-3" />
        ) : (
          <span className={cn("flex items-center gap-2")}>
            {selected?.icon} {selected?.label}
          </span>
        )
      }
      triggerCSS={cn(!isMobile && "pl-1", isMobile && "w-9 h-9", className)}
      title="Выберите список"
      contentCSS={cn("max-h-md", variant === "dashboard" && "w-xs")}
      isLoading={isLoading}
      error={error}
      renderOption={(opt) => (
        <span className={cn("flex items-center gap-2")}>
          {opt.icon} {opt.label}
        </span>
      )}
    />
  );
}
