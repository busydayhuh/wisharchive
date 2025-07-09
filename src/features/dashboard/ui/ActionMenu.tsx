import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shared/ui/kit/dropdown-menu";
import { ArchiveRestore, Edit2, Trash2 } from "lucide-react";
import { ActionMenuTrigger } from "./ActionButtons";

function ActionMenu({
  align = "end",
  side = "top",
  triggerVariant = "gallery",
}: React.ComponentProps<"div"> & {
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
  triggerVariant?: "gallery" | "table";
}) {
  return (
    <DropdownMenu>
      <ActionMenuTrigger variant={triggerVariant} />
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
