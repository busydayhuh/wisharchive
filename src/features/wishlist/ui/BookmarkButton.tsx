import { cn } from "@/shared/lib/css";
import { Toggle } from "@/shared/ui/kit/toggle";
import { Bookmark } from "lucide-react";

export function BookmarkButton({
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
        "bg-secondary data-[state=on]:bg-destructive data-[state=on]:[&_svg]:fill-white data-[state=on]:[&_svg]:stroke-white px-1 py-1 rounded-sm size-9 data-[state=on]:text-destructive hover:text-foreground cursor-pointer",

        className
      )}
      defaultPressed={isFavorite}
      onPressedChange={onPressed}
    >
      <Bookmark className={cn("transition duration-200")} />
    </Toggle>
  );
}
