import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { Toggle } from "@/shared/ui/kit/toggle";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Bookmark, Ellipsis, Pencil } from "lucide-react";

export function ActionMenuTrigger({
  variant = "gallery",
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table";
}) {
  return (
    <DropdownMenuTrigger
      className={cn(
        "inline-flex justify-center items-center border-0 rounded-full size-9 text-sm cursor-pointer",
        variant === "gallery" &&
          "bg-secondary hover:bg-muted peer/cover transition  duration-300 show-on-hover",
        variant === "table" &&
          "md:bg-transparent bg-muted hover:bg-muted/60 shadow-none md:mx-auto ms-auto me-1",
        className
      )}
    >
      <Ellipsis className="size-4" />
    </DropdownMenuTrigger>
  );
}

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
  className,
}: React.ComponentProps<"div"> & {
  variant?: "gallery" | "table";
}) {
  return (
    <Toggle
      className={cn(
        "after:invisible data-[state=on]:after:visible z-10 after:absolute data-[state=on]:bg-transparent data-[state=on]:[&_svg]:fill-destructive px-1 py-1 border-0 rounded-full after:content-['✨'] data-[state=on]:after:animate-star cursor-pointer",
        variant === "gallery" &&
          "top-1 right-1 z-10 absolute data-[state=off]:[&_svg]:fill-secondary data-[state=on]:[&_svg]:fill-destructive [&_svg]:stroke-0 transition hover:bg-muted-foreground/40",
        variant === "table" &&
          "data-[state=off]:[&_svg]:text-foreground [&_svg]:stroke-[1px] data-[state=off]:hover:[&_svg]:fill-muted data-[state=on]:[&_svg]:text-destructive [state=on]:[&_svg]:fill-destructive hover:bg-muted",
        className
      )}
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
