import { Button } from "@/shared/ui/kit/button";
import { cn } from "@/shared/utils/css";
import { Pencil } from "lucide-react";

export function EditWishlistButton({
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
      variant="secondary"
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
