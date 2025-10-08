import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Pencil } from "lucide-react";

export function EditWishlistButton({
  onClick,
  className,
}: React.ComponentProps<"button"> & {
  onClick: (open: boolean) => void;
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
