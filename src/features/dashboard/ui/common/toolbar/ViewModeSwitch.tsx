import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import { LayoutDashboard, LayoutList } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export type ViewModeSwitchType = {
  setViewMode: Dispatch<SetStateAction<string>>;
  viewMode: string;
};

function ViewModeSwitch({
  setViewMode,
  viewMode,
  className,
}: ViewModeSwitchType & React.ComponentProps<"div">) {
  const toggleStyles =
    "cursor-pointer rounded-xl first:rounded-l-xl last:rounded-r-xl text-muted-foreground";

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={(value) => {
        if (value) setViewMode(value);
      }}
      className={className}
    >
      <ToggleGroupItem value="gallery" className={toggleStyles}>
        <LayoutDashboard />
      </ToggleGroupItem>
      <ToggleGroupItem value="table" className={toggleStyles}>
        <LayoutList />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export default ViewModeSwitch;
