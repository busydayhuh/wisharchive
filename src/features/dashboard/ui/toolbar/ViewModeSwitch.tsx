import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/kit/toggle-group";
import { LayoutDashboard, LayoutList } from "lucide-react";

export type ViewModeSwitchType = {
  setViewMode: (value: "gallery" | "table") => void;
  viewMode: "gallery" | "table";
};

function ViewModeSwitch({
  setViewMode,
  viewMode,
  className,
}: ViewModeSwitchType & React.ComponentProps<"div">) {
  const toggleStyles =
    "cursor-pointer rounded-sm first:rounded-l-sm last:rounded-r-sm text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-background hover:bg-accent w-9 aspect-square";

  return (
    <ToggleGroup
      type="single"
      value={viewMode}
      onValueChange={setViewMode}
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
