import { useProtectedAction } from "@/shared/hooks/useProtectedAction";
import { Toggle } from "@/shared/ui/kit/toggle";
import { cn } from "@/shared/utils/css";
import { Bookmark } from "lucide-react";

export function BookmarkButton({
  isFavorite = false,
  onPressed,
  className,
  variant,
}: React.ComponentProps<"div"> & {
  isFavorite: boolean;
  onPressed: (pressed: boolean) => void;
  variant?: "gallery" | "table" | "page";
}) {
  const protectedAction = useProtectedAction();

  return (
    <Toggle
      className={cn(
        "bg-secondary data-[state=on]:bg-primary hover:bg-secondary/80 data-[state=on]:[&_svg]:fill-primary-foreground data-[state=on]:[&_svg]:stroke-primary-foreground px-1 py-1 rounded-sm data-[state=on]:text-primary-foreground hover:text-foreground cursor-pointer shrink-0",
        (variant === "gallery" || variant === "table") && "h-9 w-9",
        variant === "page" &&
          "h-9 gap-1.5 px-3 has-[>svg]:px-2.5 text-xs md:text-sm",
        variant === "gallery" && "bg-inactive-bm",

        className
      )}
      defaultPressed={isFavorite}
      onPressedChange={(pressed) => protectedAction(() => onPressed(pressed))}
    >
      <Bookmark
        className={cn(
          "transition duration-200",
          variant === "page" && "size-3"
        )}
      />
      {variant === "page" ? (isFavorite ? "В закладках" : "В закладки") : null}
    </Toggle>
  );
}
