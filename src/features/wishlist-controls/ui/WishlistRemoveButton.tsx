import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { X } from "lucide-react";

export default function WishlistRemoveButton({
  onRemove,
  variant,
  className,
}: {
  onRemove: () => void;
  variant: "gallery" | "table";
  className?: string;
}) {
  return (
    <Button
      onClick={onRemove}
      size="icon"
      variant="secondary"
      className={cn(
        className,
        variant === "gallery" && "aspect-square",
        variant === "table" && "px-2.5",
        "h-9 md:h-9"
      )}
      aria-label="Убрать из списка"
    >
      <X />
      {variant === "table" && "Убрать"}
    </Button>
  );
}
