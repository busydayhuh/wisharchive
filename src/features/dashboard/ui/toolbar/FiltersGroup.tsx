import { useAuth } from "@/features/auth";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/use-mobile";
import { Button } from "@/shared/ui/kit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { Toggle } from "@/shared/ui/kit/toggle";
import { ListFilterPlus } from "lucide-react";
import type { JSX } from "react";
import type { ToolbarState } from "../../model/DashboardToolbarContext";
import { toolbarConfigs } from "../../model/toolbarConfig";
import { useDashboardToolbar } from "../../model/useDashboardToolbar";

function FiltersGroup({ isOwner }: { isOwner: boolean }) {
  const { toolbarState, setToolbarState, dashboardType } =
    useDashboardToolbar();

  const isMobile = useIsMobile();
  const { current: user } = useAuth();

  const toolbarFilters = toolbarState.filters;
  const pageFilters = toolbarConfigs[dashboardType].filters;

  const isPressed = (key: string) => toolbarFilters.some((f) => f.key === key);

  const toggles =
    pageFilters.length > 0
      ? pageFilters.map((i) => {
          const shouldRender =
            !(i.requiresUser && !user) && (!i.onlyIfOwner || isOwner);
          if (!shouldRender) return null;

          const value = i.requiresUser && user ? user.$id : i.value;

          return (
            <FilterToggle
              key={i.label}
              filterKey={i.key}
              value={value}
              label={i.label}
              isPressed={isPressed(i.key)}
              setToolbarState={setToolbarState}
            />
          );
        })
      : null;

  if (isMobile)
    return (
      <FiltersPopover toggles={toggles} isActive={toolbarFilters.length > 0} />
    );

  return (
    <div className="flex gap-2 max-w-lg overflow-x-scroll shrink-0">
      {toggles}
    </div>
  );
}

function FilterToggle({
  filterKey,
  value,
  label,
  isPressed,
  setToolbarState,
}: {
  filterKey: string;
  value?: string | boolean | number | null;
  label: string;
  isPressed: boolean;
  setToolbarState: React.Dispatch<React.SetStateAction<ToolbarState>>;
}) {
  const filter = { key: filterKey, value, label };

  const toggleFilter = (pressed: boolean) => {
    if (pressed)
      setToolbarState((prev) => ({
        ...prev,
        filters: [...prev.filters, filter],
      }));

    if (!pressed)
      setToolbarState((prev) => ({
        ...prev,
        filters: [...prev.filters].filter((f) => f.key !== filterKey),
      }));
  };

  return (
    <Toggle
      variant="default"
      value={filterKey}
      defaultPressed={isPressed}
      onPressedChange={toggleFilter}
      className={cn(
        "data-[state=on]:bg-destructive border-1 border-muted-foreground/50 data-[state=on]:border-none text-muted-foreground data-[state=on]:text-background cursor-pointer"
      )}
    >
      {label}
    </Toggle>
  );
}

function FiltersPopover({
  toggles,
  isActive,
}: {
  toggles: (JSX.Element | null)[] | null;
  isActive: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant={isActive ? "destructive" : "muted"}>
          <ListFilterPlus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-wrap items-center gap-1.5 bg-secondary w-3xs">
        {toggles}
      </PopoverContent>
    </Popover>
  );
}

export default FiltersGroup;
