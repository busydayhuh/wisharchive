import { cn } from "@/shared/lib/css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { ArchiveRestore, Edit2, Ellipsis, Trash2 } from "lucide-react";

function ActionMenu({
  align = "end",
  side = "top",
  triggerVariant = "gallery",
  className,
}: React.ComponentProps<"div"> & {
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
  triggerVariant?: "gallery" | "table";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex justify-center items-center border-0 rounded-full size-9 text-sm cursor-pointer",
          triggerVariant === "gallery" &&
            "bg-secondary hover:bg-muted peer/cover transition duration-300 show-on-hover",
          triggerVariant === "table" &&
            "md:bg-transparent bg-muted hover:bg-muted/60 shadow-none md:mx-auto ms-auto me-1",
          className
        )}
      >
        <Ellipsis className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="**:[&_svg]:stroke-[1.5px] rounded-2xl **:first:hover:rounded-tl-2xl **:first:hover:rounded-tr-2xl **:last:hover:rounded-bl-2xl **:last:hover:rounded-br-2xl w-56 **:cursor-pointer"
        align={align}
        side={side}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ArchiveRestore /> Уже подарили
          </DropdownMenuItem>
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

export default ActionMenu;
