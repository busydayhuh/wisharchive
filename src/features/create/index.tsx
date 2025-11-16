import { useWishlistDialog } from "@/features/wishlist";
import { ROUTES } from "@/shared/model/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { ListPlus, Plus, Stars } from "lucide-react";
import { useNavigate } from "react-router";

function CreateButtonWithDropdown() {
  const { openDialog } = useWishlistDialog();
  const navigate = useNavigate();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="right-[50%] bottom-8 z-20 fixed flex justify-center items-center translate-x-[50%] cursor-pointer">
          <Plus className="z-10 absolute stroke-[1.5px] text-background" />
          <div className="flex justify-center items-center blur-2xs gradient-btn">
            <div className="blur-lg gradient-btn"></div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={24}
        className="bg-blue-200 *:focus:bg-transparent shadow-blue-200 shadow-lg px-2 py-2 border-0 rounded-xl **:text-foreground **:cursor-pointer"
      >
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            navigate(ROUTES.ADD);
          }}
        >
          <Stars className="stroke-[1.5px]" />
          Новое желание
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => openDialog("create")}>
          <ListPlus className="stroke-[1.5px]" /> Новый список
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CreateButtonWithDropdown;
