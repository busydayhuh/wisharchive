import { cn } from "@/shared/lib/css";
import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { ChevronDown } from "lucide-react";
import type { SortState } from "../../model/DashboardToolbarContext";
import { toolbarConfigs } from "../../model/toolbarConfig";
import { useDashboardToolbar } from "../../model/useDashboardToolbar";

export function SortingSelect() {
  const { toolbarState, setToolbarState, dashboardType } =
    useDashboardToolbar();

  const sortState = toolbarState.sort;

  const options = toolbarConfigs[dashboardType].sorts.map((sort) => ({
    value: `${sort.field}+${sort.direction}`,
    label: sort.label,
    icon: sort.icon,
  }));

  const isMobile = useIsMobile();

  function setSort(value: string) {
    const splitValue = value.split("+");
    const newState: SortState = {
      field: splitValue[0],
      direction: splitValue[1] as "asc" | "desc",
    };

    setToolbarState((prev) => ({ ...prev, sort: newState }));
  }

  return (
    <ResponsiveSelect
      value={`${sortState.field}+${sortState.direction}`}
      onChange={setSort}
      options={options}
      renderTrigger={(selected) => (
        <>
          <span className="flex items-center gap-1.5">
            {selected?.icon}
            {selected?.label}
          </span>
          {isMobile && <ChevronDown className="size-3" />}
        </>
      )}
      triggerCSS={cn(
        "gap-2 bg-primary w-fit max-w-[16rem] data-[size=default]:h-10 font-medium text-primary-foreground text-xs lg:text-sm",
        isMobile && "h-9 px-2.5"
      )}
      title="Сортировка"
    />
  );
}
