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
          "bg-background hover:bg-muted peer/cover invisible aria-expanded:visible group-hover/cover:visible right-2 -bottom-3 z-10 absolute opacity-0 aria-expanded:opacity-100 group-hover/cover:opacity-100 transition aria-expanded:-translate-y-6 group-hover/cover:-translate-y-6 duration-300 ",
        variant === "table" &&
          "bg-transparent hover:bg-muted/60 shadow-none mx-auto",
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
          "invisible group-hover:visible right-2 -bottom-3 z-10 absolute opacity-0 group-hover:opacity-100 group-hover:brightness-100 border-0 rounded-full transition group-hover:-translate-y-6 duration-300",
        variant === "table" &&
          "bg-transparent shadow-none rounded-full hover:bg-muted",
        className
      )}
    >
      <Pencil />
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
        "after:invisible data-[state=on]:after:visible z-10 after:absolute data-[state=on]:bg-transparent hover:bg-muted-foreground/40 data-[state=on]:[&_svg]:fill-destructive px-1 py-1 border-0 after:content-['✨'] data-[state=on]:after:animate-star cursor-pointer",
        variant === "gallery" &&
          "top-1 right-1 z-10 absolute data-[state=off]:[&_svg]:fill-secondary data-[state=on]:[&_svg]:fill-destructive [&_svg]:stroke-0 transition rounded-full",
        variant === "table" &&
          "data-[state=off]:[&_svg]:text-foreground [&_svg]:stroke-[1.4px] data-[state=off]:hover:[&_svg]:fill-muted data-[state=on]:[&_svg]:text-destructive [state=on]:[&_svg]:fill-destructive",
        className
      )}
    >
      <Bookmark
        className={cn(
          "transition duration-200",
          variant === "gallery" ? "size-5" : "size-5"
        )}
      />
    </Toggle>
  );
}
