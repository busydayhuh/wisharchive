import { cn } from "@/shared/lib/css";
import { Toggle } from "@/shared/ui/kit/toggle";
import { Bookmark } from "lucide-react";

export function BookmarkButton({
  variant = "gallery",
  isFavorite = false,
  onPressed,
  className,
}: React.ComponentProps<"div"> & {
  isFavorite: boolean;
  onPressed?: (pressed: boolean) => void;
  variant?: "gallery" | "table";
}) {
  return (
    <Toggle
      size={variant === "gallery" ? "sm" : "default"}
      className={cn(
        "relative px-1 py-1 rounded-full cursor-pointer",

        variant === "gallery" &&
          "top-2 right-2 z-10 absolute bg-secondary data-[state=on]:bg-destructive data-[state=on]:text-destructive data-[state=on]:[&_svg]:fill-white",

        variant === "table" &&
          "data-[state=on]:[&_svg]:fill-destructive data-[state=on]:bg-transparent data-[state=on]:text-destructive ",
        className
      )}
      defaultPressed={isFavorite}
      onPressedChange={onPressed}
    >
      <Bookmark className={cn("stroke-[1.5px] transition duration-200")} />
    </Toggle>
  );
}
