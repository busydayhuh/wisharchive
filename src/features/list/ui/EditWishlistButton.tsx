import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { Pencil } from "lucide-react";

export function EditWishlistButton({
  variant,
  onClick,
  className,
}: React.ComponentProps<"button"> & {
  variant: "table" | "gallery";
  onClick: (open: boolean) => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <Button
      size={isMobile ? "sm" : "icon"}
      onClick={onClick}
      type="button"
      variant="secondary"
      className={cn(
        "z-10",
        variant === "gallery" &&
          "border-0 rounded-full transition duration-300 show-on-hover",
        variant === "table" &&
          "bg-transparent shadow-none rounded-full hover:bg-muted",
        className
      )}
    >
      <Pencil className="stroke-[1.3px]" />
    </Button>
  );
}
