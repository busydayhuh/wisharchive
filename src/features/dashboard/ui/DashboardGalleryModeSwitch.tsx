import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import { LayoutDashboard, LayoutList } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export type DashboardGalleryModeSwitchType = {
  setGalleryMode: Dispatch<SetStateAction<string>>;
  galleryMode: string;
};

function DashboardGalleryModeSwitch({
  setGalleryMode,
  galleryMode,
}: DashboardGalleryModeSwitchType) {
  const toggleStyles =
    "cursor-pointer rounded-xl first:rounded-l-xl last:rounded-r-xl text-muted-foreground";
  return (
    <ToggleGroup
      type="single"
      value={galleryMode}
      onValueChange={(value) => {
        if (value) setGalleryMode(value);
      }}
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
