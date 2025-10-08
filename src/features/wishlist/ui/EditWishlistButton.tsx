import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Pencil } from "lucide-react";

export function EditWishlistButton({
  variant = "gallery",
  onClick,
  className,
}: React.ComponentProps<"button"> & {
  variant?: "gallery" | "table" | "page";
}) {
  return (
    <Button
      size="icon"
      onClick={onClick}
      type="button"
      variant={variant === "page" ? "ghost" : "secondary"}
      className={cn(
        "z-10",

        className
      )}
      aria-label="Редактировать вишлист"
    >
      <Pencil />
    </Button>
  );
}
