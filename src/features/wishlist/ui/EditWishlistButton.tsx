import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Pencil } from "lucide-react";

export function EditWishlistButton({
  variant,
  onClick,
  className,
}: React.ComponentProps<"button"> & {
  variant: "table" | "gallery";
  onClick: (open: boolean) => void;
}) {
  return (
    <Button
      size="icon"
      onClick={onClick}
      type="button"
      variant={variant === "gallery" ? "secondary" : "outline"}
      className={cn(
        "z-10",

        className
      )}
    >
      <Pencil />
    </Button>
  );
}
