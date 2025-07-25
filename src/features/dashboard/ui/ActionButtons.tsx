import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Toggle } from "@/shared/ui/kit/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/kit/tooltip";
import { Bookmark, Gift, Pencil } from "lucide-react";
import DataStatePropInterceptor from "./DataStatePropInterceptor";

export function EditButton({
  variant = "gallery",
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table";
}) {
  return (
    <Button
      size="icon"
      variant="secondary"
      className={cn(
        "z-10",
        variant === "gallery" &&
          "border-0 rounded-full transition duration-300 show-on-hover",
        variant === "table" &&
          "bg-transparent shadow-none rounded-full hover:bg-muted",
        className
      )}
    >
      <Pencil className="stroke-[1.3px]" />
    </Button>
  );
}

export function BookmarkButton({
  variant = "gallery",
  isFavored = false,
  onPressed,
  className,
}: React.ComponentProps<"div"> & {
  isFavored: boolean;
  onPressed?: (pressed: boolean) => void;
  variant?: "gallery" | "table";
}) {
  return (
    <Toggle
      className={cn(
        "after:invisible data-[state=on]:after:visible z-10 after:absolute data-[state=on]:bg-transparent data-[state=on]:[&_svg]:fill-destructive px-1 py-1 border-0 rounded-full after:content-['✨'] cursor-pointer",
        !isFavored && "data-[state=on]:after:animate-star",
        isFavored && "data-[state=on]:after:invisible",
        variant === "gallery" &&
          "top-1 right-1 z-10 absolute data-[state=off]:[&_svg]:fill-white data-[state=on]:[&_svg]:fill-destructive data-[state=off]:[&_svg]:stroke-1 data-[state=on]:[&_svg]:stroke-0 transition text-muted-foreground hover:bg-transparent",
        variant === "table" &&
          "data-[state=off]:[&_svg]:text-foreground [&_svg]:stroke-[1px] data-[state=off]:hover:[&_svg]:fill-muted data-[state=on]:[&_svg]:text-destructive [state=on]:[&_svg]:fill-destructive hover:bg-muted",
        className
      )}
      defaultPressed={isFavored}
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

export function GiftButton({
  variant = "gallery",
  isBooked = false,
  isBookedByCurrentUser,
  onPressed,
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table";
  isBooked: boolean;
  isBookedByCurrentUser: boolean;
  onPressed?: (pressed: boolean) => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DataStatePropInterceptor>
          <Toggle
            disabled={isBooked && !isBookedByCurrentUser}
            defaultPressed={isBookedByCurrentUser}
            className={cn(
              "z-10 data-[state=on]:bg-destructive border-0 rounded-full data-[state=on]:text-secondary cursor-pointer",
              variant === "gallery" &&
                "hover:bg-secondary/80 hover:text-secondary-foreground bg-secondary shadow-xs transition duration-300 show-on-hover disabled:bg-secondary/30 disabled:text-muted/60",
              variant === "table" &&
                "bg-muted shadow-none rounded-full hover:bg-destructive hover:text-secondary",
              className
            )}
            onPressedChange={onPressed}
          >
            <Gift className="stroke-[1.3px]" />
          </Toggle>
        </DataStatePropInterceptor>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isBookedByCurrentUser ? "Отменить бронь" : "Хочу подарить"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
