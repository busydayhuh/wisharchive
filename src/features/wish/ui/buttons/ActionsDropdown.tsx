import { cn } from "@/shared/lib/css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { ArchiveRestore, Check, Edit2, Ellipsis, Trash2 } from "lucide-react";

export function ActionsDropdown({
  align = "end",
  side = "top",
  triggerVariant = "gallery",
  isArchived = false,
  className,
}: React.ComponentProps<"div"> & {
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
  triggerVariant?: "gallery" | "table" | "page";
  isArchived?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex justify-center items-center border-0 rounded-full size-8 md:size-9 text-sm cursor-pointer",
          triggerVariant === "gallery" &&
            "bg-secondary hover:bg-muted peer/cover transition duration-300 show-on-hover",
          triggerVariant === "table" &&
            "md:bg-transparent bg-muted hover:bg-muted/60 shadow-none md:mx-auto ms-auto me-1",
          triggerVariant === "page" && "bg-muted hover:bg-muted/60",
          className
        )}
      >
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-secondary **:[&_svg]:stroke-[1.5px] rounded-xl **:first:hover:rounded-tl-xl **:first:hover:rounded-tr-xl **:last:hover:rounded-bl-xl **:last:hover:rounded-br-xl w-56 **:cursor-pointer"
        align={align}
        side={side}
      >
        <DropdownMenuGroup>
          {triggerVariant !== "page" ? (
            isArchived ? (
              <DropdownMenuItem>
                <ArchiveRestore /> Вернуть из архива
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Check /> Уже подарили
              </DropdownMenuItem>
            )
          ) : null}
          <DropdownMenuItem>
            <Edit2 /> Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem className="tracking-wide">
            <Trash2 /> Удалить
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
