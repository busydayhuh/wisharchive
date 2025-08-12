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
      className={cn(
        "after:invisible data-[state=on]:after:visible z-10 after:absolute data-[state=on]:bg-transparent data-[state=on]:[&_svg]:fill-destructive px-1 py-1 border-0 rounded-full after:content-['✨'] cursor-pointer",
        !isFavorite && "data-[state=on]:after:animate-star",
        isFavorite && "data-[state=on]:after:invisible",
        variant === "gallery" &&
          "top-1 right-1 z-10 absolute data-[state=off]:[&_svg]:fill-white data-[state=on]:[&_svg]:fill-destructive data-[state=off]:[&_svg]:stroke-1 data-[state=on]:[&_svg]:stroke-0 transition text-muted-foreground hover:bg-transparent",
        variant === "table" &&
          "data-[state=off]:[&_svg]:text-foreground [&_svg]:stroke-[1px] data-[state=off]:hover:[&_svg]:fill-muted data-[state=on]:[&_svg]:text-destructive [state=on]:[&_svg]:fill-destructive hover:bg-muted",
        className
      )}
      defaultPressed={isFavorite}
      onPressedChange={onPressed}
    >
      <Bookmark
        className={cn(
          "transition duration-200",
          variant === "gallery" ? "size-6" : "size-5"
        )}
      />
    </Toggle>
  );
}
