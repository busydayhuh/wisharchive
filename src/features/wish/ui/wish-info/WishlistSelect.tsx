import { useAuth } from "@/features/auth";
import { useCollabWishlists } from "@/features/dashboard";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ArrowLeftRightIcon, EyeClosed, List, Users2, X } from "lucide-react";

export function WishlistSelect({
  onValueChange,
  value,
  variant = "dashboard",
  className,
}: {
  onValueChange: (value: string) => void;
  value?: string;
  variant?: "dashboard" | "form";
  className?: string;
}) {
  const { current } = useAuth();
  const isMobile = useIsMobile();

  const { wishlists, isLoading, error } = useCollabWishlists({
    order: "desc",
    orderBy: "$updatedAt",
  });

  const icons = {
    default: (
      <span className="bg-pink-200 p-2 rounded-sm [&_svg]:size-3 text-foreground">
        <EyeClosed />
      </span>
    ),
    private: (
      <span className="bg-indigo-200 p-2 rounded-sm [&_svg]:size-3 text-indigo-800">
        <List />
      </span>
    ),
    collab: (
      <span className="bg-sky-200 p-2 rounded-sm [&_svg]:size-3 text-sky-800">
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
      triggerJSX={
        variant === "dashboard" &&
        isMobile && <ArrowLeftRightIcon className="size-3" />
      }
      triggerCSS={cn(className)}
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
