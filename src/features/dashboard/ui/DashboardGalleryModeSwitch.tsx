import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import { LayoutDashboard, LayoutList } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type DashboardGalleryModeSwitchType = {
  set: Dispatch<SetStateAction<string>>;
  mode: string;
};

function DashboardGalleryModeSwitch({
  set,
  mode,
}: DashboardGalleryModeSwitchType) {
  const toggleStyles =
    "cursor-pointer rounded-xl first:rounded-l-xl last:rounded-r-xl text-muted-foreground";
  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={(value) => {
        if (value) set(value);
      }}
      className="self-end"
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

export default DashboardGalleryModeSwitch;
