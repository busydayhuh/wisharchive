import { useAuth } from "@/features/auth";
import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { Button } from "@/shared/ui/kit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { Toggle } from "@/shared/ui/kit/toggle";
import { ListFilterPlus, X } from "lucide-react";
import { useCallback, useMemo, type JSX } from "react";
import type { ToolbarState } from "../../model/DashboardToolbarContext";
import { toolbarConfigs } from "../../model/toolbarConfig";
import { useDashboardToolbar } from "../../model/useDashboardToolbar";

function FiltersGroup({ isOwner }: { isOwner: boolean }) {
  const { toolbarState, setToolbarState, dashboardType } =
    useDashboardToolbar();

  const isMobile = useIsMobile();
  const { current: user } = useAuth();

  const toolbarFilters = useMemo(() => toolbarState.filters, [toolbarState]);
  const pageFilters = useMemo(
    () => toolbarConfigs[dashboardType].filters,
    [dashboardType]
  );

  const isPressed = useCallback(
    (key: string) => toolbarFilters.some((f) => f.key === key),
    [toolbarFilters]
  );

  const toggles = useMemo(() => {
    if (pageFilters.length === 0) return null;

    return pageFilters
      .map((i) => {
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
      .filter(Boolean);
  }, [isOwner, isPressed, pageFilters, setToolbarState, user]);

  if (isMobile)
    return (
      <FiltersPopover toggles={toggles} isActive={toolbarFilters.length > 0} />
    );

  return (
    <div className="flex gap-2 max-w-xl overflow-x-scroll no-scrollbar">
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
  const filter = useMemo(
    () => ({ key: filterKey, value, label }),
    [filterKey, value, label]
  );

  const toggleFilter = useCallback(
    (pressed: boolean) => {
      setToolbarState((prev) => ({
        ...prev,
        filters: pressed
          ? [...prev.filters, filter]
          : prev.filters.filter((f) => f.key !== filter.key),
      }));
    },
    [filter, setToolbarState]
  );

  return (
    <Toggle
      variant="default"
      value={filterKey}
      defaultPressed={isPressed}
      onPressedChange={toggleFilter}
      className={cn(
        "items-center bg-muted/60 data-[state=on]:bg-primary md:bg-transparent hover:bg-muted/60 px-2.5 rounded-md font-medium text-muted-foreground/70 data-[state=on]:text-background hover:text-muted-foreground text-xs lg:text-sm cursor-pointer shrink-0"
      )}
    >
      {label}
      {isPressed && <X className="size-3" />}
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
        <Button
          size="icon"
          variant={isActive ? "default" : "ghost"}
          className={cn(isActive && "relative has-active-filter")}
        >
          <ListFilterPlus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-wrap items-center gap-1.5 bg-secondary w-3xs shrink-0">
        {toggles}
      </PopoverContent>
    </Popover>
  );
}

export default FiltersGroup;
