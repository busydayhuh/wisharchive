import { Button } from "@/shared/ui/kit/button";
import { ButtonGroup } from "@/shared/ui/kit/button-group";
import { cn } from "@/shared/utils/css";
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
    "cursor-pointer rounded-sm first:rounded-l-sm last:rounded-r-sm text-muted-foreground hover:bg-muted/80 bg-muted";
  const activeState = "bg-primary text-background hover:bg-primary";

  return (
    <ButtonGroup aria-label="View mode" orientation="horizontal">
      <Button
        size="icon"
        className={cn(
          toggleStyles,
          viewMode === "gallery" && activeState,
          className
        )}
        onClick={() => setViewMode("gallery")}
      >
        <LayoutDashboard />
      </Button>
      <Button
        size="icon"
        className={cn(
          toggleStyles,
          viewMode === "table" && activeState,
          className
        )}
        onClick={() => setViewMode("table")}
      >
        <LayoutList />
      </Button>
    </ButtonGroup>
  );
}

export default ViewModeSwitch;
