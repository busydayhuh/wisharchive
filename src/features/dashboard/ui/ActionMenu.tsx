import { Button } from "@/shared/ui/kit/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Archive, Ellipsis, PenTool, Trash2 } from "lucide-react";

function ActionMenu({
  className,
  align = "end",
  side = "top",
}: React.ComponentProps<"div"> & {
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button size="icon" variant="outline" className="border-0 rounded-full">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-xl w-56 **:cursor-pointer"
        align={align}
        side={side}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Archive className="stroke-[1.5px] size-4" /> Уже подарили
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PenTool className="stroke-[1.5px] size-4" /> Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem className="tracking-wide">
            <Trash2 className="stroke-[1.5px] size-4" /> Удалить
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionMenu;
