import { cn } from "@/shared/lib/css";
import { Toggle } from "@/shared/ui/kit/toggle";
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
  return (
    <Toggle
      className={cn(
        "bg-secondary data-[state=on]:bg-destructive data-[state=on]:[&_svg]:fill-white data-[state=on]:[&_svg]:stroke-white px-1 py-1 rounded-sm data-[state=on]:text-white hover:text-foreground cursor-pointer shrink-0",
        variant === "gallery" || (variant === "table" && "h-9 w-9"),
        variant === "page" && "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",

        className
      )}
      defaultPressed={isFavorite}
      onPressedChange={onPressed}
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
