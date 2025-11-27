import { useAuth } from "@/features/auth";
import { useCollabWishlists } from "@/features/dashboard";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { WishlistDocumentType } from "@/shared/model/types";
import { PRIVACY_ICONS } from "@/shared/ui/Badges";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ArrowLeftRightIcon } from "lucide-react";

export function WishlistSelect({
  onValueChange,
  value,
  variant = "dashboard",
  className,
}: {
  onValueChange: (id: string, wishlist: WishlistDocumentType | null) => void;
  value?: string;
  variant?: "dashboard" | "form";
  className?: string;
}) {
  const { current } = useAuth();
  const isMobile = useIsMobile();

  const { wishlists, isLoading, error } = useCollabWishlists(
    {
      sort: { field: "$sequence", direction: "desc" },
      filters: [],
      limit: 100,
    },
    "all",
    current?.$id
  );

  const options = [
    {
      value: "none",
      label: "без списка",
      icon: PRIVACY_ICONS.none,
    },
    ...(wishlists ?? []).map((wl) => ({
      value: wl.$id,
      label: wl.title,
      icon:
        wl.ownerId === current?.$id
          ? wl.isPrivate
            ? PRIVACY_ICONS.private
            : PRIVACY_ICONS.default
          : PRIVACY_ICONS.collab,
    })),
  ];

  return (
    <ResponsiveSelect
      options={options}
      onChange={(value) => {
        const selectedList = wishlists?.find((wl) => wl.$id === value);
        onValueChange(value, selectedList ?? null);
      }}
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
