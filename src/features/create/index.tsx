import { WishlistDialog } from "@/features/list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { Plus, Stars } from "lucide-react";

function CreateButtonWithDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="right-[50%] bottom-8 z-20 fixed flex justify-center items-center cursor-pointer">
          <Plus className="z-10 absolute stroke-[1.3px] text-background" />
          <div className="flex justify-center items-center blur-2xs gradient-btn">
            <div className="blur-lg gradient-btn"></div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={24}
        className="bg-blue-200 *:focus:bg-transparent shadow-blue-200 shadow-lg px-2 py-2 border-0 rounded-2xl **:text-foreground **:cursor-pointer"
      >
        <DropdownMenuItem>
          <Stars className="stroke-[1.3px]" /> Новое желание
        </DropdownMenuItem>
        <WishlistDialog action="create" triggerVariant="dropdown" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CreateButtonWithDropdown;
